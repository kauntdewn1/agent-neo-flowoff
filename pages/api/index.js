// Vercel serverless function entry point
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Sistema de memória para sessões
const sessions = new Map();
const LEADS_FILE = path.join(__dirname, '..', 'data', 'leads.json');

// Carregar leads existentes
let leads = [];
if (fs.existsSync(LEADS_FILE)) {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf8');
    leads = data.trim() ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar leads:', error);
  }
}

// Salvar leads no arquivo
function saveLeads() {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (error) {
    console.error('Erro ao salvar leads:', error);
  }
}

// Lógica do agente NEO.FLOWOFF
class NeoWebAgent {
  constructor() {
    this.name = "NeoWebAgent";
    this.description = "Agente IA que atende visitantes do site NEO.FLOWOFF";
  }

  processMessage(message, sessionId) {
    const session = sessions.get(sessionId) || this.createSession(sessionId);
    
    // Primeira interação - pergunta sobre perfil
    if (!session.profile) {
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('empresário') || lowerMessage.includes('empresario')) {
        session.profile = 'empresário';
        return {
          response: "Perfeito! Como empresário, entendo que você busca soluções para escalar seu negócio. Qual é sua principal dor hoje? Precisa de mais clientes, automatizar processos ou melhorar a gestão?",
          actions: this.getActions(session.profile)
        };
      } else if (lowerMessage.includes('freelancer') || lowerMessage.includes('freelancer')) {
        session.profile = 'freelancer';
        return {
          response: "Ótimo! Como freelancer, sei que você precisa de mais projetos e clientes qualificados. Qual é seu maior desafio? Conseguir mais leads, precificar seus serviços ou organizar seu trabalho?",
          actions: this.getActions(session.profile)
        };
      } else if (lowerMessage.includes('agência') || lowerMessage.includes('agencia')) {
        session.profile = 'agência';
        return {
          response: "Excelente! Como agência, você precisa de ferramentas para gerenciar múltiplos clientes. Qual é sua maior necessidade? Automatizar atendimento, gerar mais leads ou melhorar a retenção de clientes?",
          actions: this.getActions(session.profile)
        };
      } else {
        return {
          response: "Olá! Antes de te mostrar o que fazemos, posso saber se você é empresário, freelancer ou agência?",
          actions: []
        };
      }
    }

    // Capturar dor específica
    if (!session.pain) {
      session.pain = message;
      return {
        response: `Entendi! ${session.pain} é realmente um desafio importante. Na NEO.FLOWOFF, temos soluções específicas para isso. Posso te mostrar como podemos resolver isso?`,
        actions: this.getActions(session.profile)
      };
    }

    // Capturar nome se ainda não foi capturado
    if (!session.name && this.containsName(message)) {
      session.name = this.extractName(message);
    }

    // Resposta final com proposta de valor
    return {
      response: `Perfeito! Baseado no que você me contou, posso te ajudar a resolver "${session.pain}". Que tal conversarmos melhor? Posso te conectar com nossa equipe ou agendar uma demonstração personalizada.`,
      actions: this.getActions(session.profile)
    };
  }

  createSession(sessionId) {
    const session = {
      id: sessionId,
      profile: null,
      pain: null,
      name: null,
      createdAt: new Date().toISOString()
    };
    sessions.set(sessionId, session);
    return session;
  }

  getActions(profile) {
    const whatsappMessage = this.getWhatsAppMessage(profile);
    
    return [
      {
        name: "Falar no WhatsApp",
        type: "link",
        url: `https://wa.me/5562983231110?text=${encodeURIComponent(whatsappMessage)}`
      }
    ];
  }

  getWhatsAppMessage(profile) {
    const baseMessage = "Olá! Vim pelo site NEO.FLOWOFF e quero saber mais sobre os serviços.";
    
    if (profile === 'empresário') {
      return `${baseMessage} Sou empresário e preciso de soluções para escalar meu negócio.`;
    } else if (profile === 'freelancer') {
      return `${baseMessage} Sou freelancer e preciso de mais projetos e clientes qualificados.`;
    } else if (profile === 'agência') {
      return `${baseMessage} Tenho uma agência e preciso de ferramentas para gerenciar múltiplos clientes.`;
    }
    
    return baseMessage;
  }

  containsName(message) {
    const namePatterns = [
      /meu nome é (\w+)/i,
      /sou o (\w+)/i,
      /sou a (\w+)/i,
      /chamo (\w+)/i,
      /sou (\w+)/i
    ];
    return namePatterns.some(pattern => pattern.test(message));
  }

  extractName(message) {
    const namePatterns = [
      /meu nome é (\w+)/i,
      /sou o (\w+)/i,
      /sou a (\w+)/i,
      /chamo (\w+)/i,
      /sou (\w+)/i
    ];
    
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  saveLead(sessionId) {
    const session = sessions.get(sessionId);
    if (session && session.profile && session.pain) {
      const lead = {
        id: uuidv4(),
        name: session.name || 'Não informado',
        profile: session.profile,
        pain: session.pain,
        sessionId: sessionId,
        createdAt: session.createdAt,
        savedAt: new Date().toISOString()
      };
      
      leads.push(lead);
      saveLeads();
      return lead;
    }
    return null;
  }
}

const agent = new NeoWebAgent();

// Rotas da API
app.post('/api/chat', (req, res) => {
  const { message, sessionId } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Mensagem é obrigatória' });
  }

  const currentSessionId = sessionId || uuidv4();
  const response = agent.processMessage(message, currentSessionId);
  
  // Salvar lead se tiver informações suficientes
  const lead = agent.saveLead(currentSessionId);
  
  res.json({
    ...response,
    sessionId: currentSessionId,
    lead: lead
  });
});

app.get('/api/leads', (req, res) => {
  res.json(leads);
});

app.get('/api/session/:sessionId', (req, res) => {
  const session = sessions.get(req.params.sessionId);
  if (session) {
    res.json(session);
  } else {
    res.status(404).json({ error: 'Sessão não encontrada' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    agent: agent.name,
    sessions: sessions.size,
    leads: leads.length
  });
});

// Webhook para integração com Hugging Face
app.post('/api/huggingfaceProxy', async (req, res) => {
  const { input } = req.body;
  
  if (!input) {
    return res.status(400).json({ error: 'Input é obrigatório' });
  }

  try {
    // Chamada para o modelo Mistral-7B-Instruct-v0.2
    const huggingfaceResponse = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_TOKEN || 'hf_xxx_ocultado'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: `[INST] Você é o concierge inteligente do site NEO.FLOWOFF. Sua missão é descobrir o perfil do visitante, entender suas dores e guiá-lo para o produto ideal. Responda de forma natural e personalizada. Input do usuário: ${input} [/INST]`
      })
    });

    if (!huggingfaceResponse.ok) {
      throw new Error('Erro na API do Hugging Face');
    }

    const aiResponse = await huggingfaceResponse.json();
    const generatedText = aiResponse[0]?.generated_text || 'Desculpe, não consegui processar sua mensagem.';

    // Processar também através do agente local para ações e leads
    const sessionId = req.headers['x-session-id'] || uuidv4();
    const agentResponse = agent.processMessage(input, sessionId);
    
    // Salvar lead se tiver informações suficientes
    const lead = agent.saveLead(sessionId);
    
    res.json({
      output: generatedText,
      actions: agentResponse.actions,
      sessionId: sessionId,
      lead: lead,
      source: 'huggingface-mistral'
    });

  } catch (error) {
    console.error('Erro no Hugging Face:', error);
    
    // Fallback para o agente local em caso de erro
    const sessionId = req.headers['x-session-id'] || uuidv4();
    const response = agent.processMessage(input, sessionId);
    const lead = agent.saveLead(sessionId);
    
    res.json({
      output: response.response,
      actions: response.actions,
      sessionId: sessionId,
      lead: lead,
      source: 'local-fallback'
    });
  }
});

// Rota para servir o embed
app.get('/embed', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'embed.html'));
});

// Exportar para Vercel como função serverless
export default function handler(req, res) {
  // Middleware básico
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Roteamento básico
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  
  if (pathname === '/api/health') {
    res.status(200).json({ 
      status: 'ok', 
      agent: 'NeoWebAgent',
      message: 'Agente NEO.FLOWOFF funcionando!'
    });
    return;
  }
  
  if (pathname === '/embed') {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head><title>NEO.FLOWOFF - Agente IA</title></head>
      <body>
        <h1>🤖 NEO.FLOWOFF</h1>
        <p>Agente IA funcionando!</p>
        <p>Status: ✅ Online</p>
      </body>
      </html>
    `);
    return;
  }
  
  res.status(404).json({ error: 'Endpoint não encontrado' });
}

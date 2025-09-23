# 🤖 Agent NEO.FLOWOFF - Descrição Completa do Projeto

## 📋 **Visão Geral**

O **Agent NEO.FLOWOFF** é um sistema de agente conversacional inteligente desenvolvido para a empresa NEO.FLOWOFF, especializado em capturar leads qualificados através de conversas naturais com visitantes do site.

## 🎯 **Objetivo Principal**

O sistema identifica automaticamente o perfil do visitante (empresário, freelancer ou agência), entende suas dores específicas e os direciona para soluções adequadas, capturando informações valiosas para o funil de vendas.

## 🏗️ **Arquitetura do Sistema**

### **Backend (Express.js)**
- **Servidor principal**: `server.js` (porta 3000)
- **Sistema de sessões**: Memória em tempo real com Map()
- **Armazenamento de leads**: Arquivo JSON (`data/leads.json`)
- **APIs integradas**: HuggingFace + Invertexto

### **Frontend (Next.js)**
- **Páginas**: `pages/index.js` (interface principal)
- **APIs**: `pages/api/` (endpoints Next.js)
- **Embed**: `public/embed.html` (widget incorporável)

## 🧠 **Inteligência Artificial**

### **Dupla Camada de IA:**

1. **Agente Local (NeoWebAgent)**:
   - Lógica de negócio específica da NEO.FLOWOFF
   - Fluxo de conversação estruturado
   - Captura de leads qualificados
   - Geração de ações personalizadas

2. **IA Externa (HuggingFace Mistral-7B)**:
   - Respostas naturais e contextualizadas
   - Fallback inteligente em caso de erro
   - Processamento de linguagem natural avançado

## 🔄 **Fluxo de Conversação**

### **Fase 1: Identificação de Perfil**
```
Usuário → "Sou empresário" 
Sistema → Identifica perfil + Pergunta sobre dor específica
```

### **Fase 2: Captura de Dor**
```
Usuário → "Preciso de mais clientes"
Sistema → Registra dor + Oferece solução personalizada
```

### **Fase 3: Conversão**
```
Sistema → Gera link WhatsApp personalizado
Usuário → Clica e vai para WhatsApp com contexto
```

## 📊 **Sistema de Leads**

### **Estrutura do Lead:**
```json
{
  "id": "uuid-v4",
  "name": "Nome do usuário",
  "profile": "empresário|freelancer|agência",
  "pain": "Dor específica mencionada",
  "sessionId": "ID da sessão",
  "createdAt": "timestamp",
  "savedAt": "timestamp"
}
```

### **Captura Automática:**
- Leads são salvos automaticamente quando completos
- Persistência em arquivo JSON
- Endpoint `/api/leads` para consulta

## 🔌 **APIs Integradas**

### **1. HuggingFace (IA Conversacional)**
- **Modelo**: Mistral-7B-Instruct-v0.2
- **Endpoint**: `/api/huggingfaceProxy`
- **Função**: Respostas naturais e contextualizadas
- **Fallback**: Agente local em caso de erro

### **2. Invertexto (Utilitários)**
- **Endpoint**: `/api/invertexto`
- **Funcionalidades**: 10+ utilitários brasileiros
- **Inclui**: CEP, CNPJ, CPF, QR Code, Barcode, etc.
- **Plano**: Gratuito até 3.000 requests/mês

## 🎨 **Interface do Usuário**

### **Widget Embeddable**
- **Arquivo**: `public/embed.html`
- **Funcionalidade**: Chat widget incorporável
- **Design**: Interface moderna e responsiva
- **Integração**: JavaScript simples para qualquer site

### **Dashboard de Monitoramento**
- **URL**: `http://localhost:3000/embed`
- **Funcionalidades**: Visualização de conversas em tempo real
- **Métricas**: Sessões ativas, leads capturados

## 📱 **Integração WhatsApp**

### **Redirecionamento Inteligente**
- Links personalizados por perfil
- Mensagens pré-formatadas com contexto
- Número configurável via `.env`

### **Exemplo de Mensagem:**
```
"Olá! Vim pelo site NEO.FLOWOFF e quero saber mais sobre os serviços. 
Sou empresário e preciso de soluções para escalar meu negócio."
```

## ⚙️ **Configuração e Deploy**

### **Variáveis de Ambiente (.env)**
```bash
# IA
HUGGINGFACE_TOKEN=hf_seu_token

# Utilitários
INVERTEXTO_API_TOKEN=seu_token

# WhatsApp
WHATSAPP_NUMBER=5562983231110

# Servidor
PORT=3000
NODE_ENV=development
```

### **Scripts Disponíveis**
```bash
npm run dev      # Next.js development
npm run build    # Build para produção
npm run start    # Next.js produção
npm run local    # Express.js local
```

## 🚀 **Casos de Uso**

### **1. Site Corporativo**
- Widget incorporado na página inicial
- Captura automática de visitantes interessados
- Qualificação por perfil e dor

### **2. Landing Pages**
- Integração em páginas específicas
- Conversão direta para WhatsApp
- Acompanhamento de métricas

### **3. Campanhas de Marketing**
- Segmentação automática de leads
- Mensagens personalizadas por perfil
- Otimização de conversão

## 📈 **Métricas e Analytics**

### **Dados Capturados**
- Perfil do visitante (empresário/freelancer/agência)
- Dor específica mencionada
- Tempo de conversação
- Taxa de conversão para WhatsApp

### **Endpoints de Monitoramento**
- `GET /api/health` - Status do sistema
- `GET /api/leads` - Lista de leads capturados
- `GET /api/session/:id` - Detalhes da sessão

## 🔒 **Segurança e Performance**

### **Medidas de Segurança**
- Validação de entrada em todas as APIs
- Rate limiting implícito via HuggingFace
- Sanitização de dados de leads
- CORS configurado adequadamente

### **Performance**
- Cache de sessões em memória
- Fallback para agente local
- Respostas assíncronas
- Logs estruturados para debugging

## 🛠️ **Tecnologias Utilizadas**

### **Backend**
- **Express.js** - Servidor web
- **Next.js** - Framework React
- **Axios** - Cliente HTTP
- **UUID** - Geração de IDs únicos

### **IA e APIs**
- **HuggingFace** - Modelo Mistral-7B
- **Invertexto** - Utilitários brasileiros
- **Fetch API** - Requisições HTTP nativas

### **Armazenamento**
- **JSON** - Persistência de leads
- **Map()** - Cache de sessões
- **File System** - Operações de arquivo

## 📋 **Estrutura de Arquivos**

```
agent-neo-flowoff/
├── agents/                 # Configurações de agentes
├── data/                  # Armazenamento de leads
├── pages/                 # Páginas Next.js
│   ├── api/              # Endpoints da API
│   └── index.js          # Página principal
├── public/                # Arquivos estáticos
├── server.js              # Servidor Express principal
├── package.json           # Dependências
├── .env                   # Variáveis de ambiente
└── README.md              # Documentação
```

## 🎯 **Diferenciais do Sistema**

1. **Dupla Inteligência**: IA externa + lógica de negócio local
2. **Captura Automática**: Leads qualificados sem intervenção manual
3. **Personalização**: Respostas específicas por perfil
4. **Integração Brasileira**: APIs nacionais (Invertexto)
5. **Widget Embeddable**: Fácil integração em qualquer site
6. **Fallback Inteligente**: Sistema sempre funcional
7. **Métricas Completas**: Acompanhamento de performance

## 🔮 **Possíveis Expansões**

- Integração com CRMs (HubSpot, Pipedrive)
- Notificações por email
- Dashboard web completo
- Integração com Google Analytics
- Sistema de A/B testing
- Chatbot com múltiplos idiomas
- Integração com redes sociais

---

**Este sistema representa uma solução completa de captura de leads através de IA conversacional, otimizada para o mercado brasileiro e focada em conversão de visitantes em clientes qualificados.**

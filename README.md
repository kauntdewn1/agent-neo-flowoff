# 🤖 Agente NEO.FLOWOFF

Agente de IA inteligente para atendimento de visitantes do site NEO.FLOWOFF, desenvolvido para descobrir o perfil do visitante, entender suas dores e guiá-lo para o produto ideal.

## 🚀 Funcionalidades

- **Identificação de Perfil**: Detecta automaticamente se o visitante é empresário, freelancer ou agência
- **Captura de Dores**: Identifica as principais necessidades e desafios do visitante
- **Memória de Sessão**: Mantém contexto da conversa durante toda a sessão
- **Ações Personalizadas**: Oferece botões de ação específicos para cada perfil
- **Sistema de Leads**: Salva automaticamente leads qualificados em JSON
- **Interface Moderna**: Chat responsivo e intuitivo

## 📋 Pré-requisitos

- Node.js 14+ 
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd agent-neo-flowoff
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm run dev
```

## 🌐 Uso

### Acesso ao Chat
- **Interface Web**: http://localhost:3000/embed
- **API Health**: http://localhost:3000/api/health

### Endpoints da API

#### POST /api/chat
Envia mensagem para o agente
```json
{
  "message": "empresário",
  "sessionId": "opcional"
}
```

#### GET /api/leads
Lista todos os leads capturados

#### GET /api/session/:sessionId
Recupera dados de uma sessão específica

## 🎯 Fluxo do Agente

1. **Boas-vindas**: Pergunta sobre o perfil (empresário/freelancer/agência)
2. **Identificação de Dores**: Descobre as principais necessidades
3. **Captura de Nome**: Extrai nome quando mencionado
4. **Proposta de Valor**: Oferece soluções personalizadas
5. **Ações de Conversão**: Botões para WhatsApp, agendamento, etc.

## 📊 Dados Salvos

Os leads são salvos em `data/leads.json` com:
- Nome do visitante
- Perfil identificado
- Dor principal
- ID da sessão
- Timestamps

## 🔧 Configuração

### Configuração de Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar com suas configurações
nano .env
```

**Variáveis principais:**
- `HUGGINGFACE_TOKEN` - Token da API do Hugging Face (obrigatório)
- `PORT` - Porta do servidor (opcional, padrão: 3000)
- `WHATSAPP_NUMBER` - Número do WhatsApp para redirecionamento
- `CALENDLY_LINK` - Link do Calendly para agendamentos

**No Vercel:** Adicione as variáveis nas Environment Variables do projeto.

**Obtenha seu token Hugging Face em:** https://huggingface.co/settings/tokens

### Personalização do Agente
Edite `agents/neo-web-agent.whisky.yaml` para:
- Modificar mensagens
- Ajustar fluxo de conversa
- Personalizar ações

### URLs de Ação
Atualize as URLs no código para:
- WhatsApp da empresa
- Link do Calendly
- Páginas específicas por perfil

## 🚀 Deploy

Para produção, configure:
- Variável de ambiente `PORT`
- HTTPS se necessário
- Backup dos leads
- Monitoramento de logs

## 📝 Estrutura do Projeto

```
agent-neo-flowoff/
├── agents/
│   └── neo-web-agent.whisky.yaml  # Configuração do agente
├── data/
│   └── leads.json                  # Leads capturados
├── public/
│   └── embed.html                  # Interface do chat
├── server.js                       # Servidor Express
├── package.json                    # Dependências
└── README.md                       # Este arquivo
```

## 🤝 Contribuição

Este projeto segue a arquitetura NEØ. Para modificações estruturais, consulte Mellø.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato com a equipe NEO.FLOWOFF.

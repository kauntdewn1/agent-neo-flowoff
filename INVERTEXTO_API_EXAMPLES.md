# 🔧 API Invertexto - Exemplos de Uso

A API Invertexto oferece múltiplas funcionalidades em um único serviço brasileiro.

## 📋 Endpoints Disponíveis

### 1. 📊 **Barcode** - Geração de Códigos de Barras
```javascript
// POST /api/invertexto
{
  "endpoint": "barcode",
  "params": {
    "text": "123456789",
    "type": "code128",
    "width": "200",
    "height": "100"
  }
}
```

### 2. 📱 **QR Code** - Geração de QR Codes
```javascript
// POST /api/invertexto
{
  "endpoint": "qrcode",
  "params": {
    "text": "https://neo.flowoff.com",
    "size": "200",
    "format": "png"
  }
}
```

### 3. 🌍 **GeoIP** - Localização por IP
```javascript
// POST /api/invertexto
{
  "endpoint": "geoip",
  "params": {
    "ip": "8.8.8.8"
  }
}
```

### 4. 💱 **Currency** - Conversão de Moedas
```javascript
// POST /api/invertexto
{
  "endpoint": "currency",
  "params": {
    "from": "USD",
    "to": "BRL",
    "amount": "100"
  }
}
```

### 5. 👤 **Faker** - Dados Falsos
```javascript
// POST /api/invertexto
{
  "endpoint": "faker",
  "params": {
    "type": "person",
    "locale": "pt_BR"
  }
}
```

### 6. ✅ **Validator** - Validação de Dados
```javascript
// POST /api/invertexto
{
  "endpoint": "validator",
  "params": {
    "type": "cpf",
    "value": "12345678901"
  }
}
```

### 7. 📮 **CEP** - Consulta de CEP
```javascript
// POST /api/invertexto
{
  "endpoint": "cep",
  "params": {
    "cep": "74000000"
  }
}
```

### 8. 🏢 **CNPJ** - Consulta de CNPJ
```javascript
// POST /api/invertexto
{
  "endpoint": "cnpj",
  "params": {
    "cnpj": "12345678000195"
  }
}
```

### 9. 🔢 **Number to Words** - Número por Extenso
```javascript
// POST /api/invertexto
{
  "endpoint": "number-to-words",
  "params": {
    "number": "1234",
    "locale": "pt_BR"
  }
}
```

### 10. 📧 **Email Validator** - Validação de Email
```javascript
// POST /api/invertexto
{
  "endpoint": "email-validator",
  "params": {
    "email": "teste@exemplo.com"
  }
}
```

## 🚀 Como Usar

### 1. Configure o Token
```bash
# No arquivo .env
INVERTEXTO_API_TOKEN=seu_token_aqui
```

### 2. Faça Requisições
```javascript
// Exemplo com fetch
const response = await fetch('/api/invertexto', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    endpoint: 'cep',
    params: {
      cep: '74000000'
    }
  })
});

const data = await response.json();
console.log(data);
```

### 3. Exemplo com Axios
```javascript
import axios from 'axios';

const result = await axios.post('/api/invertexto', {
  endpoint: 'barcode',
  params: {
    text: '123456789',
    type: 'code128'
  }
});

console.log(result.data);
```

## 📊 Planos e Limites

- **Gratuito**: 3.000 requests/mês
- **Básico**: 100.000 requests/mês (R$ 49/mês)
- **Premium**: 1.000.000 requests/mês (R$ 99/mês)

## 🔗 Links Úteis

- [Documentação Oficial](https://api.invertexto.com/)
- [Obter Token](https://api.invertexto.com/tokens)
- [Status da API](https://status.invertexto.com/)

## ⚠️ Notas Importantes

1. **Token obrigatório**: Todas as requisições precisam do token
2. **Rate limiting**: Respeite os limites do seu plano
3. **Formato**: Sempre use POST com JSON
4. **Parâmetros**: Cada endpoint tem parâmetros específicos
5. **Respostas**: Todas retornam JSON padronizado

// test-invertexto.js - Script para testar a API Invertexto
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/invertexto';

// Função para testar um endpoint
async function testEndpoint(endpoint, params, description) {
  console.log(`\n🧪 Testando: ${description}`);
  console.log(`📡 Endpoint: ${endpoint}`);
  console.log(`📝 Parâmetros:`, params);
  
  try {
    const response = await axios.post(BASE_URL, {
      endpoint,
      params
    });
    
    console.log(`✅ Sucesso:`, response.data);
    return response.data;
  } catch (error) {
    console.log(`❌ Erro:`, error.response?.data || error.message);
    return null;
  }
}

// Função principal de teste
async function runTests() {
  console.log('🚀 Iniciando testes da API Invertexto...\n');
  
  // Teste 1: CEP
  await testEndpoint('cep', { cep: '74000000' }, 'Consulta de CEP');
  
  // Teste 2: Validação de CPF
  await testEndpoint('validator', { type: 'cpf', value: '12345678901' }, 'Validação de CPF');
  
  // Teste 3: Número por extenso
  await testEndpoint('number-to-words', { number: '1234', locale: 'pt_BR' }, 'Número por extenso');
  
  // Teste 4: Validação de email
  await testEndpoint('email-validator', { email: 'teste@exemplo.com' }, 'Validação de email');
  
  // Teste 5: QR Code
  await testEndpoint('qrcode', { text: 'https://neo.flowoff.com', size: '200' }, 'Geração de QR Code');
  
  // Teste 6: Barcode
  await testEndpoint('barcode', { text: '123456789', type: 'code128' }, 'Geração de código de barras');
  
  // Teste 7: Conversão de moeda
  await testEndpoint('currency', { from: 'USD', to: 'BRL', amount: '100' }, 'Conversão de moeda');
  
  // Teste 8: GeoIP
  await testEndpoint('geoip', { ip: '8.8.8.8' }, 'Localização por IP');
  
  // Teste 9: Dados falsos
  await testEndpoint('faker', { type: 'person', locale: 'pt_BR' }, 'Geração de dados falsos');
  
  // Teste 10: Consulta CNPJ
  await testEndpoint('cnpj', { cnpj: '12345678000195' }, 'Consulta de CNPJ');
  
  console.log('\n🏁 Testes concluídos!');
}

// Executar testes se o script for chamado diretamente
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testEndpoint, runTests };

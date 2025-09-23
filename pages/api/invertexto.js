// pages/api/invertexto.js
import axios from "axios";

export default async function handler(req, res) {
  console.log("🔧 Entrou no endpoint Invertexto");

  const token = process.env.INVERTEXTO_API_TOKEN;
  console.log("🔑 Token Invertexto existe?", !!token);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { endpoint, params } = req.body || {};
  console.log("📝 Endpoint:", endpoint);
  console.log("📝 Parâmetros:", params);

  if (!endpoint) {
    return res.status(400).json({ error: "Endpoint é obrigatório" });
  }

  if (!token) {
    return res.status(500).json({ error: "Token da Invertexto não configurado" });
  }

  try {
    // Construir URL com token
    const baseUrl = "https://api.invertexto.com/v1";
    let url = `${baseUrl}/${endpoint}?token=${token}`;
    
    // Adicionar parâmetros se fornecidos
    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      url = `${url}&${queryParams}`;
    }

    console.log("🌐 URL final:", url);

    const response = await axios.get(url);
    console.log("✅ Resposta Invertexto:", response.data);

    return res.status(200).json({
      success: true,
      data: response.data,
      endpoint: endpoint,
      source: "invertexto"
    });

  } catch (err) {
    console.error("❌ Erro Invertexto:", err.response?.status, err.response?.data || err.message);
    return res.status(500).json({
      error: "Erro na API Invertexto",
      details: err.response?.data || err.message,
    });
  }
}

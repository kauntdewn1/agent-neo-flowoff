// pages/api/huggingfaceProxy.js
import axios from "axios";

export default async function handler(req, res) {
  console.log("🔥 Entrou no huggingfaceProxy endpoint");

  const token = process.env.HUGGINGFACE_TOKEN;
  console.log("🔑 Token existe?", !!token);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { input } = req.body || {};
  console.log("📝 Input recebido:", input);

  if (!input) {
    return res.status(400).json({ error: "Missing input" });
  }

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      { inputs: `[INST] ${input} [/INST]` },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ Resposta HF:", response.data);

    const output = Array.isArray(response.data)
      ? response.data[0]?.generated_text
      : response.data?.generated_text;

    return res.status(200).json({ output: output || "Sem resposta do modelo" });
  } catch (err) {
    console.error("❌ Erro HuggingFace:", err.response?.status, err.response?.data || err.message);
    return res.status(500).json({
      error: "Erro na API do Hugging Face",
      details: err.response?.data || err.message,
    });
  }
}

// pages/api/huggingfaceProxy.js
import axios from "axios";

const MODEL_ID = process.env.HF_MODEL_ID || "mistralai/Mistral-7B-Instruct-v0.2";
const ALLOW_ORIGINS = [
  "https://neo-flowoff.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

export default async function handler(req, res) {
  // CORS básico p/ testes
  const origin = req.headers.origin || "";
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", ALLOW_ORIGINS.includes(origin) ? origin : "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-debug-id");
    return res.status(204).end();
  }
  res.setHeader("Access-Control-Allow-Origin", ALLOW_ORIGINS.includes(origin) ? origin : "*");

  const t0 = Date.now();
  const debugId = req.headers["x-debug-id"] || `DBG-${Date.now()}`;
  const token = process.env.HUGGINGFACE_TOKEN;
  if (!token) return res.status(500).json({ error: "HUGGINGFACE_TOKEN ausente" });

  try {
    const { input } = req.body || {};
    if (!input) return res.status(400).json({ error: "input vazio" });

    console.log(`[HF][${debugId}] IN →`, input);

    const hfRes = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      { inputs: `[INST] ${input} [/INST]` },
      { headers: { Authorization: `Bearer ${token}` }, timeout: 60_000 }
    );

    // Alguns modelos retornam array; outros, objeto
    const data = Array.isArray(hfRes.data) ? hfRes.data[0] : hfRes.data;
    const text = data?.generated_text || data?.text || "…";

    console.log(
      `[HF][${debugId}] OUT ← ${text?.slice(0, 120)}… | ${MODEL_ID} | ${Date.now() - t0}ms`
    );

    return res.status(200).json({ output: text, model: MODEL_ID, debugId, ms: Date.now() - t0 });
  } catch (err) {
    console.error(`[HF][${debugId}] ERROR →`, err?.response?.data || err.message);
    return res.status(500).json({ error: "Falha na HuggingFace", debugId });
  }
}

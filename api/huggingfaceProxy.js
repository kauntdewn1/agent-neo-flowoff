import axios from "axios";

export default async function handler(req, res) {
  const { input } = req.body;

  const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN;
  const MODEL = "mistralai/Mistral-7B-Instruct-v0.2";

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        inputs: input,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
        },
      }
    );

    const output = response.data[0]?.generated_text || "Desculpe, não entendi.";
    res.status(200).json({ output });
  } catch (error) {
    console.error("Erro HuggingFace:", error.message);
    res.status(500).json({ error: "Erro ao processar resposta com IA" });
  }
}

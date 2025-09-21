import axios from "axios";

export default async function handler(req, res) {
  const { input } = req.body;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        inputs: `[INST] ${input} [/INST]`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        },
      }
    );

    const output = response.data[0]?.generated_text || "Não entendi. Pode repetir?";
    res.status(200).json({ output });
  } catch (error) {
    console.error("Erro ao consultar HuggingFace:", error);
    res.status(500).json({ error: "Erro no servidor HuggingFace" });
  }
}

export default function handler(req, res) {
  res.status(200).json({ 
    status: 'ok', 
    agent: 'NeoWebAgent',
    message: 'Agente NEO.FLOWOFF funcionando!',
    timestamp: new Date().toISOString()
  });
}

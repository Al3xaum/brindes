export default async function handler(req, res) {
  const DB_URL = "https://kvdb.io/XZWZXe2hqonabBMXYhWFDd/";

  // Busca dados (GET)
  if (req.method === 'GET') {
    try {
      const response = await fetch(DB_URL);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(200).json({ siteData: {}, giftProducts: [] });
    }
  }

  // Salva dados (POST)
  if (req.method === 'POST') {
    try {
      await fetch(DB_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body)
      });
      return res.status(200).json({ message: "Guardado com sucesso!" });
    } catch (e) {
      return res.status(500).json({ error: "Erro ao salvar" });
    }
  }
}
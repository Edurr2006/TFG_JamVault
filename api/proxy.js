export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Falta parámetro 'url'" });
  }

  // 🔒 Seguridad: solo permitir Songsterr
  if (!url.startsWith("https://www.songsterr.com/")) {
    return res.status(400).json({ error: "Solo se permite Songsterr" });
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type") || "application/json";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Access-Control-Allow-Origin", "*"); // ✅ Permite acceso desde tu front
    res.setHeader("Access-Control-Allow-Methods", "GET");

    const body = await response.text();
    res.status(response.status).send(body);
  } catch (error) {
    console.error("Error en proxy:", error);
    res.status(500).json({ error: "Error al conectar con Songsterr" });
  }
}

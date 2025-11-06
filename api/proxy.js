export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Falta parámetro 'url'" });
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType || "application/json");

    const body = await response.text();
    res.status(response.status).send(body);
  } catch (error) {
    console.error("Error en proxy:", error);
    res.status(500).json({ error: "Error al conectar con Songsterr" });
  }
}

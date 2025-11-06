import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/tabs", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Falta parámetro q" });

  try {
    const response = await fetch(`https://www.songsterr.com/a/ra/songs.json?pattern=${encodeURIComponent(q)}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al conectar con Songsterr" });
  }
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));

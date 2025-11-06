// === Función para obtener canciones desde Songsterr mediante tu proxy ===
async function obtenerCanciones(artista) {
  try {
    const songsterrUrl = `https://www.songsterr.com/a/ra/songs.json?pattern=${encodeURIComponent(
      artista
    )}`;
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(songsterrUrl)}`;

    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
}

// === Función principal para buscar canciones ===
async function buscar() {
  const artista = document.getElementById("artista").value.trim();
  const lista = document.getElementById("resultados");

  lista.innerHTML = "";

  if (!artista) {
    alert("Por favor, escribe un artista o canción.");
    return;
  }

  lista.innerHTML = "<li>Buscando canciones...</li>";

  try {
    const canciones = await obtenerCanciones(artista);
    lista.innerHTML = "";

    if (!canciones || canciones.length === 0) {
      lista.innerHTML = "<li>No se encontraron resultados.</li>";
      return;
    }

    canciones.forEach((song) => {
      const li = document.createElement("li");

      const tabUrl = `https://www.songsterr.com/a/wsa/${song.artist.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-${song.title
        .toLowerCase()
        .replace(/\s+/g, "-")}-tab-s${song.id}`;

      li.innerHTML = `
        <strong>🎵 ${song.title}</strong><br>
        👤 <b>Artista:</b> ${song.artist.name}<br>
        🎚️ <b>Dificultad:</b> ${song.difficulty || "No disponible"}<br>
        <a href="${tabUrl}" target="_blank" rel="noopener noreferrer">Ver tablatura 🎸</a>
      `;

      lista.appendChild(li);
    });
  } catch (error) {
    console.error("Error:", error);
    lista.innerHTML = "<li>❌ Error al obtener resultados.</li>";
  }
}

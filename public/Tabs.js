document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!query) return alert("Por favor escribe algo para buscar.");
  resultsDiv.innerHTML = "<p>Buscando...</p>";

  try {
    const songsterrURL = `https://www.songsterr.com/a/ra/songs.json?pattern=${encodeURIComponent(query)}`;
   const proxyURL = `/api/proxy?url=${encodeURIComponent(songsterrURL)}`;


    const response = await fetch(proxyURL);
    if (!response.ok) throw new Error("Error al obtener datos");

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    resultsDiv.innerHTML = data
      .map(song => `
        <div class="tab-result">
          <h3>${song.title} - ${song.artist.name}</h3>
          <a href="https://www.songsterr.com/a/wsa/${song.artist.name.replace(/\s+/g, "-")}-${song.title.replace(/\s+/g, "-")}-tab-s${song.id}"
             target="_blank">Ver en Songsterr 🎸</a>
        </div>
      `)
      .join("");
  } catch (err) {
    console.error("Error:", err);
    resultsDiv.innerHTML = "<p>Error al conectar con Songsterr.</p>";
  }
});

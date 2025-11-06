async function obtenerCanciones(artista) {
  try {
    const response = await fetch(`https://www.songsterr.com/a/ra/songs.json?pattern=${encodeURIComponent(artista)}`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
}

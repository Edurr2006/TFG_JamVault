document.getElementById("showChord").addEventListener("click", mostrarAcorde);

function mostrarAcorde() {
  const root = document.getElementById("rootNote").value;
  const tipo = document.getElementById("chordType").value;
  if (!root || !tipo) {
    alert("Selecciona una nota raíz y un tipo de acorde");
    return;
  }

  // Notas en orden cromático
  const notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  // Patrones de acordes (intervalos en semitonos)
  const patrones = {
    "Mayor": [0, 4, 7],
    "Menor": [0, 3, 7],
    "7": [0, 4, 7, 10],
    "maj7": [0, 4, 7, 11],
    "m7": [0, 3, 7, 10],
    "sus2": [0, 2, 7],
    "sus4": [0, 5, 7],
    "dim": [0, 3, 6]
  };

  // Verificar que el tipo de acorde exista
  if (!patrones[tipo]) {
    alert("Tipo de acorde no válido");
    return;
  }

  const rootIndex = notas.indexOf(root);
  if (rootIndex === -1) {
    alert("Nota raíz no válida");
    return;
  }

  // Calcular las notas que componen el acorde
  const acorde = patrones[tipo].map(i => notas[(rootIndex + i) % 12]);

  // Ocultar todas las notas
  const todas = document.querySelectorAll("svg g.note");
  todas.forEach(n => n.style.display = "none");

  // Mostrar las notas del acorde
  acorde.forEach(nota => {
    const coincidencias = document.querySelectorAll(`svg g[data-note="${nota}"]`);
    coincidencias.forEach(n => {
      n.style.display = "block";
      n.querySelectorAll("ellipse").forEach(el => {
        // Raíz roja, resto color temático
        el.setAttribute("fill", nota === root ? "#FF0000" : "var(--note-color, #FF8906)");
      });
    });
  });

  console.log("Acorde generado:", root, tipo, acorde);
}

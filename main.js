const display = document.getElementById("display");
const historialCont = document.getElementById("historial");

function agregarNumero(num) {
  display.value += num;
}

function limpiar() {
  display.value = "";
}

function borrarUltimo() {
  display.value = display.value.slice(0, -1);
}

function calcular() {
  try {
    const resultado = eval(display.value);
    guardarHistorial(display.value + ' = ' + resultado);
    display.value = resultado;
  } catch {
    display.value = "Error";
  }
}

function guardarHistorial(entrada) {
  let historial = JSON.parse(localStorage.getItem("historial") || "[]");
  historial.unshift(entrada);
  localStorage.setItem("historial", JSON.stringify(historial.slice(0, 10)));
  mostrarHistorial();
}
function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem("historial") || "[]");
  historialCont.innerHTML = "<strong>Historial:</strong><br>" + historial.map(h => `• ${h}`).join("<br>");
}

function toggleModo() {
  document.body.classList.toggle("modo-oscuro");
}

document.addEventListener("keydown", (e) => {
  if ("0123456789.+-*/".includes(e.key)) agregarNumero(e.key);
  else if (e.key === "Enter") calcular();
  else if (e.key === "Escape") limpiar();
  else if (e.key === "Backspace") borrarUltimo();
});

window.onload = mostrarHistorial;

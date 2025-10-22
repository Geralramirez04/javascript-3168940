const hongo1 = document.getElementById ("hongo1");
const hongo2 = document.getElementById ("hongo2");
const hongo3 = document.getElementById ("hongo3");
const hongo4 = document.getElementById ("hongo4");
const Estrella = document.getElementById ("Estrella");
const burbuja = document.getElementById ("burbuja");
const contadorNumero = document.getElementById("contador-numero");
const contador = document.getElementById("contador");

let totalClicks = 0;

function sumarContador() {
  totalClicks++;
  contadorNumero.textContent = totalClicks;
}

hongo1.addEventListener("click", sumarContador);
hongo2.addEventListener("click", sumarContador);
hongo3.addEventListener("click", sumarContador);
hongo44.addEventListener("click", sumarContador);

hongo1.addEventListener("click", () => {
    hongo1.classList.add("desaparecer");
  });

hongo2.addEventListener("click", () => {
    hongo2.classList.add("desaparecer");
  });

hongo3.addEventListener("click", () => {
    hongo3.classList.add("desaparecer");
  });

hongo4.addEventListener("click", () => {
    hongo4.classList.add("desaparecer");
  });
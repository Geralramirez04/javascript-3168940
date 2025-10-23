const Tulipan = document.querySelectorAll(".Tulipan");
const Mariposa= document.querySelector(".Mariposa");
let contadorTulipan = 0;
  let contadorMariposa = 0;

     Tulipan.forEach(item => {

     item.addEventListener('click', () => {
      item.style.filter = 'grayscale(1)'; 
      item.classList.add('saltar');       
     });
     });
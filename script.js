const ummiButton = document.getElementById("ummiButton");
const hint = document.getElementById("hint");

let ummiSize = 17;
let otherSize = 17;

let clickCount = 0;


function ummiClicked() {

  clickCount++;

  // Tombol Ummi semakin kecil
  ummiSize -= 2;

  if (ummiSize < 8) {
    ummiSize = 8;
  }

  ummiButton.style.fontSize = ummiSize + "px";

  // Tombol Ummi semakin kecil
  const scale = Math.max(0.35, 1 - clickCount * 0.08);

  ummiButton.style.transform =
    `scale(${scale}) rotate(${randomRotation()}deg)`;


  // Tombol pindah posisi sedikit
  const x = randomNumber(-80, 80);
  const y = randomNumber(-40, 40);

  ummiButton.style.translate =
    `${x}px ${y}px`;


  // Tombol lain semakin besar
  document.querySelectorAll(".choice:not(.ummi)")
    .forEach(button => {

      otherSize += 2;

      button.style.fontSize =
        otherSize + "px";

      button.style.transform =
        `scale(${1 + clickCount * 0.08})`;

    });


  // Pesan lucu
  const messages = [
    "Hehe, jangan pilih yang itu 😌",
    "Kok masih dicoba? 😂",
    "Tombolnya mulai kabur...",
    "Aku sudah memperingatkanmu 😭",
    "Masih ngeyel juga?",
    "YA AMPUN 😭",
    "Sudahlah... pilih yang lain ❤️"
  ];

  hint.innerText =
    messages[Math.min(clickCount - 1, messages.length - 1)];
}


function randomNumber(min, max) {

  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;

}


function randomRotation() {

  return randomNumber(-15, 15);

}


/* PINDAH SLIDE */

function nextSlide(choice) {

  document.querySelectorAll(".slide")
    .forEach(slide => {

      slide.classList.remove("active");

    });


  if (choice === "sayang") {

    document
      .getElementById("sayangSlide")
      .classList.add("active");

  }


  if (choice === "cantik") {

    document
      .getElementById("cantikSlide")
      .classList.add("active");

  }

}

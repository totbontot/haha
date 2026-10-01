const intro = document.getElementById("intro");
const journey = document.getElementById("journey");
const finalScreen = document.getElementById("final");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const replayBtn = document.getElementById("replayBtn");

const statement = document.getElementById("statement");
const stepNumber = document.getElementById("stepNumber");
const progressFill = document.querySelector(".progress-fill");

const lines = [
  {
    eyebrow: "honestly",
    text: [
      "Some people",
      "just make",
      "ordinary days",
      "feel different."
    ]
  },

  {
    eyebrow: "somehow",
    text: [
      "And then",
      "there's you.",
      "Quietly",
      "special."
    ]
  },

  {
    eyebrow: "the thing is",
    text: [
      "I could",
      "probably",
      "write a thousand",
      "reasons."
    ]
  },

  {
    eyebrow: "but",
    text: [
      "I'd rather",
      "just say",
      "the simple",
      "truth."
    ]
  }
];

let currentStep = 0;


/* --------------------------------
   SCREEN SWITCHING
-------------------------------- */

function switchScreen(from, to) {
  from.classList.remove("active");

  setTimeout(() => {
    to.classList.add("active");
  }, 250);
}


/* --------------------------------
   INTRO
-------------------------------- */

startBtn.addEventListener("click", () => {

  switchScreen(intro, journey);

  currentStep = 0;

  setTimeout(() => {
    showStep();
  }, 850);

});


/* --------------------------------
   SHOW JOURNEY STEP
-------------------------------- */

function showStep() {

  const data = lines[currentStep];

  document.getElementById("journeyEyebrow").textContent =
    data.eyebrow;

  stepNumber.textContent =
    String(currentStep + 1).padStart(2, "0");

  progressFill.style.width =
    `${((currentStep + 1) / lines.length) * 100}%`;

  statement.innerHTML = "";

  data.text.forEach((line, index) => {

    const span = document.createElement("span");

    span.textContent = line;

    statement.appendChild(span);

    setTimeout(() => {
      span.classList.add("show");
    }, 100 + index * 150);

  });

  nextBtn.classList.remove("ready");

  setTimeout(() => {

    nextBtn.classList.add("ready");

    if (currentStep === lines.length - 1) {
      document.getElementById("nextText").textContent =
        "one last thing";
    } else {
      document.getElementById("nextText").textContent =
        "continue";
    }

  }, 750);
}


/* --------------------------------
   NEXT
-------------------------------- */

nextBtn.addEventListener("click", () => {

  if (currentStep < lines.length - 1) {

    currentStep++;

    statement.style.opacity = "0";
    statement.style.transform = "translateY(-15px)";

    setTimeout(() => {

      statement.style.opacity = "1";
      statement.style.transform = "translateY(0)";

      showStep();

    }, 300);

  } else {

    switchScreen(journey, finalScreen);

  }

});


/* --------------------------------
   REPLAY
-------------------------------- */

replayBtn.addEventListener("click", () => {

  finalScreen.classList.remove("active");

  setTimeout(() => {

    journey.classList.remove("active");
    intro.classList.add("active");

    currentStep = 0;

    progressFill.style.width = "25%";

  }, 700);

});


/* --------------------------------
   MOUSE INTERACTION
-------------------------------- */

window.addEventListener("mousemove", (event) => {

  const x = event.clientX;
  const y = event.clientY;

  document.documentElement.style.setProperty(
    "--pointer-x",
    `${x}px`
  );

  document.documentElement.style.setProperty(
    "--pointer-y",
    `${y}px`
  );

  document.documentElement.style.setProperty(
    "--mouse-x",
    `${x}px`
  );

  document.documentElement.style.setProperty(
    "--mouse-y",
    `${y}px`
  );

});


/* --------------------------------
   TOUCH INTERACTION
-------------------------------- */

window.addEventListener(
  "touchmove",
  (event) => {

    const touch = event.touches[0];

    document.documentElement.style.setProperty(
      "--pointer-x",
      `${touch.clientX}px`
    );

    document.documentElement.style.setProperty(
      "--pointer-y",
      `${touch.clientY}px`
    );

    document.documentElement.style.setProperty(
      "--mouse-x",
      `${touch.clientX}px`
    );

    document.documentElement.style.setProperty(
      "--mouse-y",
      `${touch.clientY}px`
    );

  },
  { passive: true }
);


/* --------------------------------
   DEVICE MOTION
   Subtle parallax on phones
-------------------------------- */

window.addEventListener("deviceorientation", (event) => {

  if (event.gamma === null || event.beta === null) {
    return;
  }

  const x = 50 + event.gamma * 0.25;
  const y = 50 + event.beta * 0.15;

  document.documentElement.style.setProperty(
    "--mouse-x",
    `${x}%`
  );

  document.documentElement.style.setProperty(
    "--mouse-y",
    `${y}%`
  );

});

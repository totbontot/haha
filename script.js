const revealButton = document.getElementById("reveal");
const message = document.getElementById("message");

revealButton.addEventListener("click", () => {
  message.classList.add("visible");

  revealButton.querySelector("span").textContent = "you found it";

  setTimeout(() => {
    message.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 150);
});

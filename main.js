let sequnce = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector(".js-start");
const resetButton = document.querySelector(".js-reset");
const info = document.querySelector(".js-info");
const heading = document.querySelector(".js-heading");
const tileContainer = document.querySelector(".js-container");
const playerTileContainer = document.querySelector(".js-player-container");

function resetGame() {
  resetButton.classList.add("hidden");
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove("hidden");
  heading.textContent = "Repeat Game";
  info.classList.add("hidden");
  tileContainer.classList.add("unclickable");
  playerTileContainer.classList.add("unclickable");
}

function humanTurn(level) {
  playerTileContainer.classList.remove("unclickable");
  info.textContent = `Your turn: ${level} Tap${level > 1 ? "s" : ""}`;
}

function activateTile(number) {
  const tile = document.querySelector(`[data-tile='${number}']`);

  tile.classList.add("activated");

  setTimeout(() => {
    tile.classList.remove("activated");
  }, 500);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 500);
  });
}

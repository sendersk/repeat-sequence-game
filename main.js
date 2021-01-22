let sequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector(".js-start");
const resetButton = document.querySelector(".js-reset");
const info = document.querySelector(".js-info");
const heading = document.querySelector(".js-heading");
const tileContainer = document.querySelector(".js-container");
const humanTileContainer = document.querySelector(".js-human-container");
const selectNumber = document.querySelector(".js-select");
const label = document.querySelector(".js-label")

function resetGame() {
  resetButton.classList.add("hidden");
  sequence = [];
  humanSequence = [];
  level = 0;
  selectNumber.value = 5;
  startButton.classList.remove("hidden");
  selectNumber.classList.remove("hidden");
  label.classList.remove("hidden")
  heading.textContent = "Repeat Game";
  info.classList.add("hidden");
  tileContainer.classList.add("unclickable");
  humanTileContainer.classList.add("unclickable");
}

function humanTurn(level) {
  humanTileContainer.classList.remove("unclickable");
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
  nextSequence.forEach((number, index) => {
    setTimeout(() => {
      activateTile(number);
    }, (index + 1) * 500);
  });
}

function nextStep() {
  const tiles = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function nextRound() {
  level += 1;
  tileContainer.classList.add("unclickable");
  humanTileContainer.classList.add("unclickable");
  info.textContent = "Wait for the computer";
  heading.textContent = `Level ${level} of ${+selectNumber.value}`;

  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 500 + 1000);
}

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    info.textContent = "Oops! Game over, you pressed the wrong tile";
    tileContainer.classList.add("unclickable");
    humanTileContainer.classList.add("unclickable");
    return;
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === +selectNumber.value) {
      info.textContent = "Congrats! You completed all the levels";
      tileContainer.classList.add("unclickable");
      humanTileContainer.classList.add("unclickable");
      return;
    }

    humanSequence = [];
    info.textContent = "Success! Keep going!";
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? "s" : ""
  }`;
}

function startGame() {
  startButton.classList.add("hidden");
  resetButton.classList.remove("hidden");
  selectNumber.classList.add("hidden");
  label.classList.add("hidden")
  info.classList.remove("hidden");
  info.textContent = "Wait for the computer";
  nextRound();
}

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

tileContainer.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});

humanTileContainer.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});

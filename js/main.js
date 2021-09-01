const msg = document.getElementById("msg");
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const startBtn = document.getElementById("start-btn");
const newCardBtn = document.getElementById("new-card");
const playerEl = document.getElementById("player-el");
const playerName = document.getElementById("player-name");
const submitNameBtn = document.getElementById("submit-name-btn");

let cards = [];
let player = {
  name: "Joy",
  chips: 200,
};
let sum = 0;
let chips = player.chips;
let isPlaying = false;
let gotBlackjack = false;

function renderGame() {
  let text = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    text += cards[i] + " ";
  }
  cardsEl.textContent = text;
  sumEl.textContent = `Sum: ${sum}`;

  if (sum < 21) {
    msg.textContent = "Would you like to draw a new card?";
  } else if (sum === 21) {
    msg.textContent = "You got blackjack!";
    player.chips += 50;
    gotBlackjack = true;
  } else {
    msg.textContent = "You're out of the game!";
    isPlaying = false;
    player.chips -= 10;
  }

  playerEl.textContent = `${player.name}: ${player.chips}`;
}

startBtn.addEventListener("click", function () {
  (isPlaying = true), (gotBlackjack = false);
  cards = [generateCard(), generateCard()];
  sum = cards[0] + cards[1];
  renderGame();
});

function generateCard() {
  let num = Math.floor(Math.random() * 13) + 1;
  if (num > 10) return 10;
  else if (num === 1) return 11;
  return num;
}

newCardBtn.addEventListener("click", function () {
  if (isPlaying === true && gotBlackjack === false) {
    let card = generateCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
});

submitNameBtn.addEventListener("click", function () {
  player.name = playerName.value;
  playerName.value = "";
  playerEl.textContent = `${player.name}: ${player.chips}`;
});

const cells = document.querySelectorAll("[data-cell]");
const winnerText = document.getElementById("winnerText");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "x";

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(e) {
  const cell = e.target;
  if (cell.classList.contains("x") || cell.classList.contains("o")) return;

  cell.classList.add(currentPlayer);
  if (checkWin(currentPlayer)) {
    winnerText.innerText = `${currentPlayer.toUpperCase()} Wins!`;
    disableBoard();
  } else if (isDraw()) {
    winnerText.innerText = "Draw!";
  } else {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
  }
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

function disableBoard() {
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

function startGame() {
  currentPlayer = "x";
  winnerText.innerText = "";
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.addEventListener("click", handleClick, { once: true });
  });
}

restartButton.addEventListener("click", startGame);

startGame();

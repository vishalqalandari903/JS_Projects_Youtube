const ticTacToeContainer = document.querySelector(".tic-tac-toe");
const boxes = Array.from(ticTacToeContainer.querySelectorAll(".box"));
const refreshButton = document.querySelector(".refresh__button");
const status = document.querySelector(".status");
const xWinCount = document.querySelector(".x_win_count span");
const oWinCount = document.querySelector(".o_win_count span");

let turn = "x";
let winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerHTML !== "") return;

    box.innerHTML = turn;
    box.classList.add("done");
    box.classList.add(turn);

    const won = checkWin();

    if (won) {
      status.innerHTML = `${turn} won`;
      ticTacToeContainer.classList.remove("x-mark", "o-mark");
      boxes.forEach((box) => (box.style.pointerEvents = "none"));

      if (turn == "x") {
        xWinCount.innerHTML++;
      } else {
        oWinCount.innerHTML++;
      }
    } else {
      turn = turn == "x" ? "o" : "x";
      ticTacToeContainer.classList.remove("x-mark", "o-mark");
      ticTacToeContainer.classList.add(`${turn}-mark`);
    }
  });
});

refreshButton.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.style.pointerEvents = "all";
    box.innerHTML = "";
    box.classList.remove("done", "x", "o");
    turn = "x";
    ticTacToeContainer.classList.remove("x-mark", "o-mark");
    ticTacToeContainer.classList.add(`${turn}-mark`);
    status.innerHTML = "Let's Start the Game";
  });
});

function checkWin() {
  for (let i = 0; i <= winConditions.length - 1; i++) {
    const winArray = winConditions[i];
    if (winArray.every((e) => boxes[e].classList.contains("done"))) {
      if (
        boxes[winArray[0]].innerHTML === boxes[winArray[1]].innerHTML &&
        boxes[winArray[1]].innerHTML === boxes[winArray[2]].innerHTML
      ) {
        return true;
      }
    }
  }
}

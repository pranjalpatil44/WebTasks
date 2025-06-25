let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;
let scores = { X: 0, O: 0 };

const boxes = document.querySelectorAll(".box");
const gameStatus = document.getElementById("game-status");
const turnBg = document.querySelector(".bg");
const playAgainButton = document.getElementById("reset-button");
const modePvPButton = document.getElementById('mode-pvp');
const xScoreSpan = document.getElementById('x-score');
const oScoreSpan = document.getElementById('o-score');

const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const messageOkButton = document.getElementById('message-ok-button');

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function showMessage(message) {
    messageText.textContent = message;
    messageBox.style.display = 'flex';
}

function hideMessageBox() {
    messageBox.style.display = 'none';
}

function updateTurnIndicator() {
    if (turnBg) {
        if (currentPlayer === "X") {
            turnBg.style.left = "0";
            turnBg.style.backgroundColor = '#B47EB3';
            gameStatus.textContent = "Player X's Turn";
        } else {
            turnBg.style.left = "50%";
            turnBg.style.backgroundColor = '#6E4D8A';
            gameStatus.textContent = "Player O's Turn";
        }
    }
}

function updateScoreDisplay() {
    xScoreSpan.textContent = scores.X;
    oScoreSpan.textContent = scores.O;
}

function changeTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnIndicator();
}

function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [v0, v1, v2] = winningCombinations[i];

        if (board[v0] !== "" && board[v0] === board[v1] && board[v0] === board[v2]) {
            isGameOver = true;
            scores[currentPlayer]++;
            updateScoreDisplay();

            winningCombinations[i].forEach(index => {
                boxes[index].classList.add("win");
            });

            gameStatus.textContent = `Player ${currentPlayer} Wins! 🎉`;
            showMessage(`Player ${currentPlayer} Wins! Congratulations!`);
            playAgainButton.style.display = "inline-block";
            return true;
        }
    }
    return false;
}

function checkDraw() {
    if (!isGameOver && board.every(cell => cell !== '')) {
        isGameOver = true;
        gameStatus.textContent = `It's a Draw! 🤝`;
        showMessage(`It's a Draw! Good game!`);
        playAgainButton.style.display = "inline-block";
        return true;
    }
    return false;
}

function handleCellClick(event) {
    const clickedBox = event.target;
    const clickedBoxIndex = parseInt(clickedBox.dataset.cellIndex);

    if (isGameOver || board[clickedBoxIndex] !== '') {
        return;
    }

    board[clickedBoxIndex] = currentPlayer;
    clickedBox.textContent = currentPlayer;
    clickedBox.classList.add(currentPlayer === 'X' ? 'x-marker' : 'o-marker');

    if (checkWin()) {
    } else if (checkDraw()) {
    } else {
        changeTurn();
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    playAgainButton.style.display = "none";
    gameStatus.textContent = `Player X's Turn`;

    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('x-marker', 'o-marker', 'win');
    });

    updateTurnIndicator();
}

boxes.forEach(box => {
    box.addEventListener("click", handleCellClick);
});

playAgainButton.addEventListener("click", () => {
    hideMessageBox();
    resetGame();
});

messageOkButton.addEventListener('click', hideMessageBox);

document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplay();
    resetGame();
    if (modePvPButton) {
        modePvPButton.disabled = true;
    }
});
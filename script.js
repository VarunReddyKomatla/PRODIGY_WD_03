document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const clickCounter = document.getElementById("click-counter");
    const twoPlayerButton = document.getElementById("two-player");
    const aiPlayerButton = document.getElementById("ai-player");
    let clickCount = 0;
    let isPlayerX = true;
    let gameMode = 'two-player'; // Default game mode
    let board = ["", "", "", "", "", "", "", "", ""];
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    twoPlayerButton.addEventListener("click", () => {
        resetGame();
        gameMode = 'two-player';
    });

    aiPlayerButton.addEventListener("click", () => {
        resetGame();
        gameMode = 'ai';
    });

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.textContent === "" && !checkWinner(board)) {
                cell.textContent = isPlayerX ? "X" : "O";
                board[cell.dataset.index] = isPlayerX ? "X" : "O";
                clickCount++;
                clickCounter.textContent = clickCount;

                if (checkWinner(board)) {
                    alert(`${isPlayerX ? "Player X" : "Player O"} wins!`);
                    return;
                }

                if (clickCount === 9) {
                    alert("It's a draw!");
                    return;
                }

                if (gameMode === 'ai' && !isPlayerX) {
                    makeAIMove();
                }

                isPlayerX = !isPlayerX;
            }
        });
    });

    function checkWinner(board) {
        return winningCombos.some(combo => {
            return combo.every(index => {
                return board[index] === (isPlayerX ? "X" : "O");
            });
        });
    }

    function makeAIMove() {
        let availableCells = board.map((cell, index) => cell === "" ? index : null).filter(val => val !== null);
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = "O";
        document.querySelector(`.cell[data-index="${randomIndex}"]`).textContent = "O";

        if (checkWinner(board)) {
            alert("AI wins!");
        }

        isPlayerX = true;
        clickCount++;
        clickCounter.textContent = clickCount;
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
        });
        clickCount = 0;
        clickCounter.textContent = clickCount;
        isPlayerX = true;
    }
});

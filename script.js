document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset-button");
    let isPlayerX = true;
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

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const cellIndex = cell.getAttribute('data-index');
            if (board[cellIndex] === "" && !checkWinner(board)) {
                board[cellIndex] = isPlayerX ? "X" : "O";
                cell.textContent = isPlayerX ? "X" : "O";

                if (checkWinner(board)) {
                    alert(`${isPlayerX ? "Player X" : "Player O"} wins!`);
                    return;
                }

                if (board.every(cell => cell !== "")) {
                    alert("It's a draw!");
                    return;
                }

                isPlayerX = !isPlayerX;
            }
        });
    });

    resetButton.addEventListener("click", resetGame);

    function checkWinner(board) {
        return winningCombos.some(combo => {
            return combo.every(index => {
                return board[index] === (isPlayerX ? "X" : "O");
            });
        });
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
        });
        isPlayerX = true;
    }
});

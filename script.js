document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-btn');
    const clickCounter = document.getElementById('click-count');
    const twoPlayersRadio = document.getElementById('two-players');
    const aiPlayerRadio = document.getElementById('ai-player');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let clicks = 0;
    let mode = 'two-players'; // Default mode is two players

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('id').substring(5));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.style.color = currentPlayer === 'X' ? '#2196f3' : '#f44336';

        clicks++;
        clickCounter.textContent = clicks;

        if (checkWin()) {
            gameActive = false;
            status.textContent = `${currentPlayer} has won!`;
            return;
        }

        if (!gameState.includes('')) {
            gameActive = false;
            status.textContent = "It's a draw!";
            return;
        }

        if (mode === 'two-players') {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        } else if (mode === 'ai-player') {
            // Implement AI logic here (not covered in this snippet)
            // For simplicity, this example focuses on two-player mode
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function handleReset() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        clicks = 0;
        clickCounter.textContent = clicks;

        status.textContent = `Player ${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = '#000';
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', handleReset);

    twoPlayersRadio.addEventListener('change', function () {
        mode = 'two-players';
        handleReset();
    });

    aiPlayerRadio.addEventListener('change', function () {
        mode = 'ai-player';
        handleReset();
    });
});

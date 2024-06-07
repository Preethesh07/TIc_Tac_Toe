document.addEventListener('DOMContentLoaded', () => {
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const resetButton = document.getElementById('reset');
    const newGameButton = document.getElementById('new-game');
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
                gameActive = false;
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
                resultMessage.innerText = `Player ${currentPlayer} wins!`;
                resultScreen.classList.remove('hidden');
                gameScreen.classList.add('hidden');
                break;
            }
        }
    };

    const checkDraw = () => {
        let isDraw = true;
        for (let cell of cells) {
            if (cell.innerText === '') {
                isDraw = false;
                break;
            }
        }
        if (isDraw) {
            gameActive = false;
            resultMessage.innerText = 'It\'s a draw!';
            resultScreen.classList.remove('hidden');
            gameScreen.classList.add('hidden');
        }
    };

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = Array.from(cells).indexOf(cell);

        if (cell.innerText === '' && gameActive) {
            cell.innerText = currentPlayer;
            checkWinner();
            checkDraw();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const resetGame = () => {
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('winner');
        });
        currentPlayer = 'X';
        gameActive = true;
        resultScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
    };

    const startNewGame = () => {
        resetGame();
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    newGameButton.addEventListener('click', startNewGame);
});

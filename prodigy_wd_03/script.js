const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const messageElement = document.getElementById('message');
let currentPlayer = 'X'; // Person starts first
let gameState = Array(9).fill(null);
let gameActive = true;

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

const handleCellClick = (e) => { 
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== null || !gameActive || currentPlayer === 'O') {
        return;
    }

    makeMove(clickedCellIndex, 'X');
    if (gameActive) {
        setTimeout(computerMove, 500); // Computer makes a move after a delay
    }
};

const makeMove = (index, player) => {
    gameState[index] = player;
    cells[index].textContent = player;
    checkForWinner();
};

const computerMove = () => {
    let availableCells = gameState.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    if (availableCells.length === 0 || !gameActive) {
        return;
    }

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex, 'O');
};

const checkForWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayMessage(`Player ${currentPlayer} has won!`);
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes(null);
    if (roundDraw) {
        displayMessage('Game is a draw!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const displayMessage = (message) => {
    messageElement.textContent = '';
    let index = 0;
    const interval = setInterval(() => {
        messageElement.textContent += message[index];
        index++;
        if (index === message.length) {
            clearInterval(interval);
        }
    }, 100); // Adjust the speed as needed
};


const restartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    messageElement.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
function createEmptyBoard() {
	const board = [];
	for (let i = 0; i < 9; i++) {
		board.push(new Array(9).fill(0));
	}
	return board;
}

function findEmptySpot(board) {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (board[i][j] === 0) {
				return [i, j];
			}
		}
	}
	return null;
}

function isValid(board, row, col, num) {
	for (let j = 0; j < 9; j++) {
		if (board[row][j] === num) {
			return false;
		}
	}

	for (let i = 0; i < 9; i++) {
		if (board[i][col] === num) {
			return false;
		}
	}

	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;

	for (let i = startRow; i < startRow + 3; i++) {
		for (let j = startCol; j < startCol + 3; j++) {
			if (board[i][j] === num) {
				return false;
			}
		}
	}

	return true;
}

function solveSudoku(board) {
	const emptySpot = findEmptySpot(board);

	if (!emptySpot) {
		return true;
	}

	const [row, col] = emptySpot;

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);

	for (const num of numbers) {
		if (isValid(board, row, col, num)) {
			board[row][col] = num;

			if (solveSudoku(board)) {
				return true;
			}

			board[row][col] = 0;
		}
	}

	return false;
}

const difficulty = {
	easy: 54,
	medium: 36,
	hard: 27,
	extreme: 18,
};

function removeNumbers(board, difficulty) {
	let attempts = 81 - difficulty;

	while (attempts > 0) {
		let row = Math.floor(Math.random() * 9);
		let col = Math.floor(Math.random() * 9);

		if (board[row][col] !== 0) {
			board[row][col] = 0;
			attempts--;
		}
	}
}

function generateSudokuGame(difficulty) {
	let board = createEmptyBoard();

	let solvedBoard = board;
	solveSudoku(solvedBoard);

	let gameBoard = solvedBoard.map((row) => [...row]);

	removeNumbers(gameBoard, difficulty);

	console.log("Solução:", solvedBoard);
	console.log("Jogo:", gameBoard);

	return { game: gameBoard, solution: solvedBoard };
}

generateSudokuGame(difficulty.medium);

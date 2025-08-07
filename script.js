function solveSudoku(board) {
	const emptySpot = findEmptySpot(board);

	if (!emptySpot) {
		return true;
	}

	const [row, col] = emptySpot;

	for (let num = 1; num <= 9; num++) {
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

const difficulty = {
  easy: 54,
  medium: 36,
  hard: 27,
  extreme: 18,
}

function generateSudokuGame() {
	let board = generateSudokuBoard();
	let soliton = solveSudoku(board);

	console.log(board);

	return board;
}

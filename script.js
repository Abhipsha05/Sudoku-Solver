var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy') //sudoku from a website
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	sudokusolver(board, 0, 0, 9);
};
function isValid(board, i, j, num, n){
  
    for(let x=0; x<n; x++){
        if(board[i][x]==num || board[x][j]==num)
            return false;
    }

    //sub-matrix check
    let rtn = Math.sqrt(n);
    let si = i - i%rtn;
    let sj = j - j%rtn;
    for(let x = si; x<si+rtn; x++)
    {
        for(let y=sj; y<sj+rtn; y++){
            if (board[x][y]==num)
            {
                return false;
            }

        }
    }
    return true; //if allthe three cases are checked
}

function sudokusolver(board, i, j, n)
{
    //base case
    if(i==n){
        //Print(board,n);
		FillBoard(board);
        return true;
    }
    //if we wre  not inside the board i.e if we cross the 9th colum then it must go to next row
    if(j==n){
       return sudokusolver(board,i+1, 0,n);//starting colum of next row 
    }
    //if cell is already filled, i.e the fixed numbers
    if(board[i][j]!=0)
    {
       return sudokusolver(board,i,j+1,n); 
    }
    //First, we'll try to fill the cell with n apt number
    for(let num=1; num<=9; num++){
        //check if num cab be filled
        if(isValid(board,i,j,num, n)){
            board[i][j]=num;
            let subAns = sudokusolver(board,i,j+1,n); //j+1 to check the ahead cell//
            if(subAns){
                return true;
            }
            //backtracking if subAns is not true -> undo the changes//
            board[i][j]=0;
        }
    }
    return false; //we were unable to fill any number 
}


function SudokuSolver(board, i, j, n) {
	// Write your Code here
}

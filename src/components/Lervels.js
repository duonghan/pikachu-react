

// --------------------level2---------------------------
    // level2 Top-Down
    moveTop2Down = (board, colIndex) => {
    	for(let i = 1; i <= board.length - 2; i++) {
    		if(board[i][colIndex] === 0) {
    			for(let j = i; j >= 1; j--) {
    				board[j][colIndex] = board[j - 1][colIndex];
    			}
    		}
    	}
    	return board;
    };

    // level2 Down-Top
    moveDown2Top = (board, colIndex) => {
    	for(let i = 1; i <= board.length - 2; i++) {
    		if(board[i][colIndex] === 0) {
    			for(let j = i; j <= board.length - 2; j++) {
    				board[j][colIndex] = board[j + 1][colIndex];
    			}
    		}
    	}
    	return board;
    };

    // level2 Right-Left
    moveRight2Left = (board, rowIndex) => {
    	for(let i = 1; i <= board[rowIndex].length - 2; i++) {
    		if(board[rowIndex][i] === 0) {
    			for(let j = i; j >= 1; j--) {
    				board[rowIndex][j] = board[rowIndex][j - 1];
    			}
    		}
    	}
    	return board;
    };

    // level2 Left-Right
    moveLeft2Right = (board, rowIndex) => {
    	for(let i = 1; i <= board[rowIndex].length - 2; i++) {
    		if(board[rowIndex][i] === 0) {
    			for(let j = i; j <= board[rowIndex].length - 2; j++) {
    				board[rowIndex][j] = board[rowIndex][j + 1];
    			}
    		}
    	}
    	return board;
    };

    // --------------------end level2----------------------


    // -----------------------startLevel3-----------------------------
    // level3 center Right-Left
    move3CenterLeftRight = (board, rowIndex, colIndex) => {
    	if(colIndex < board[rowIndex].length / 2) {
    		for(let i = 1; i < board[rowIndex].length / 2; i++) {
    			if (board[rowIndex][i] === 0) {
    				for (let j = i; j >= 1; j--) {
    					board[rowIndex][j] = board[rowIndex][j - 1];
    				}
    			}
    		}
    	} else{
    		for(let i = board[rowIndex].length / 2; i < board[rowIndex].length - 2; i++) {
    			if(board[rowIndex][i] === 0) {
    				for(let j = i; j <= board[rowIndex].length - 2; j++) {
    					board[rowIndex][j] = board[rowIndex][j + 1];
    				}
    			}
    		}
    	}
    	return board;
    };
    // level3 center Top-Down
    move3CenterTopDown = (board, colIndex, rowIndex) => {
    	if(rowIndex < (board.length) / 2 - 0.5) {
    		for(let i = 1; i < (board.length) / 2 - 0.5; i++) {
    			if(board[i][colIndex] === 0) {
    				for(let j = i; j >= 1; j--) {
    					board[j][colIndex] = board[j - 1][colIndex];
    				}
    			}
    		}
    	} else{
    		for(let i = (board.length) / 2 - 0.5; i <= board.length - 2; i++) {
    			if(board[i][colIndex] === 0) {
    				for(let j = i; j <= board.length - 2; j++) {
    					board[j][colIndex] = board[j + 1][colIndex];
    				}
    			}
    		}
    	}
    	return board;
    };




    // level3 Out-Left-Right
    move3OutLeftRight = (board, rowIndex, colIndex) => {
    	if(colIndex < board[rowIndex].length / 2) {
    		for(let i = 1; i < board[rowIndex].length / 2; i++) {
    			if(board[rowIndex][i] === 0) {
    				for(let j = i; j < board[rowIndex].length / 2; j++) {
    					console.log(j);
    					if (j === board[rowIndex].length / 2 - 1) {
    						board[rowIndex][j] = 0;
    					} else {
    						board[rowIndex][j] = board[rowIndex][j + 1];
    					}
    				}
    			} else{

    			}
    		}
    	} else{
    		for(let i = board[rowIndex].length / 2; i <= board[rowIndex].length - 2; i++) {
    			if(board[rowIndex][i] === 0) {
    				for(let j = i; j >= board[rowIndex].length / 2; j--) {
    					if(j === board[rowIndex].length / 2 ) {
    						board[rowIndex][j] = 0;
    					} else{
    						board[rowIndex][j] = board[rowIndex][j - 1];
    					}
    				}
    			}
    		}
    	}

    	return board;
    };

    move3OutTopDown=(board, rowIndex, colIndex)=>{
    	if(rowIndex < board.length / 2 - 0.5) {
    		for(let i = 1; i < board.length / 2 - 0.5; i++) {
    			if(board[i][colIndex] === 0) {
    				for(let j = i; j < board.length / 2 - 0.5; j++) {
    					if(j === board.length / 2 - 1.5) {
    						board[j][colIndex] = 0;
    					} else{
    						board[j][colIndex] = board[j + 1][colIndex];
    					}
    				}
    			}
    		}
    	} else{
    		for(let i = board.length / 2 - 0.5; i <= board.length - 2; i++) {
    			if(board[i][colIndex] === 0) {
    				console.log(board.length / 2 - 0.5);
    				for(let j = i; j >= board.length / 2 - 0.5; j--) {
    					if(j === board.length / 2 - 0.5 ) {
    						board[j][colIndex] = 0;
    					} else{
    						board[j][colIndex] = board[j - 1][colIndex];
    					}
    				}
    			}
    		}
    	}


    	return board;
    }

    // ------------------------endLevel3------------------------------
    // 
export {moveTop2Down, moveTop2Down, moveRight2Left, moveLeft2Right, move3CenterLeftRight, move3CenterTopDown, move3OutLeftRight, move3OutTopDown};

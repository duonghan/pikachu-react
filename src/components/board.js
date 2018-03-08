import React from 'react';
import Square from './square';

const row = 7;
const col = 14;
const amount = 36;

class Board extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            // squares: [...Array(amount).keys()].map(value => value+1),
            items : this.generateBoard(row,col,amount),
            clickedSequence: new Array(),
            value: 0
        }

        this.rndNum = this.rndNum.bind(this);
        this.generateBoard = this.generateBoard.bind(this);
        this.onClickHandle = this.onClickHandle.bind(this);
    }

    onClickHandle(i,j,k){
        // const squares = this.state.squares.slice();

        if(this.state.clickedSequence.length === 0){
            // this.state.clickedSequence.push({
            //     num: i,
            //     row: j,
            //     col: k
            // });
        }else if(this.state.clickedSequence[0].num === i){
            this.setState({items[this.state.clickedSequence[0].row][this.state.clickedSequence[0].col] = this.state.items[j][k] = 0});
        }
    }

    renderSquare(i,j,k) {
        return <Square key={i*col+j} value={i} onClick={()=>this.onClickHandle(i, j, k)}/>;
    }

    rndNum(a,b){
        return Math.floor(Math.random()*(b-a)) + a;
    }

    generateBoard(row, col, amount){
        let arr = new Array(row);
        let temp = new Array(); //Contain index of pokemon in first-half board.

        for(let i=0; i< row; i++){

            arr[i] = new Array(col);
            let num;

            for(let j=0; j< col; j++){
                if(i*col + j+1 <= row*col/2){   //Conditional to clone half board.
                    num = this.rndNum(1,amount);
                    arr[i][j] = num;
                    temp.push(num);
                }else{
                    let index = this.rndNum(0, temp.length - 1);
                    arr[i][j] = temp[index];
                    temp[index] = temp.pop();
                }
            }
        }

        return arr;
    }

    // generateBoard(row, col, amount){
    //     let arr = new Array(row).fill(new Array(col).fill(0));
    //
    //     let pItems = new Array(amount).fill(null).map((item, index)=> index+1);
    //
    //     let listKey = new Array(row*col).fill(null).map((item, index) => index+1);
    //
    //     while (listKey.length > 0){
    //         let x, y;
    //         let index;
    //         pItems.map(value=>{
    //             index = this.rndNum(0, listKey.length-1);
    //             x = listKey[index];
    //             listKey[index] = listKey.pop();
    //             index = this.rndNum(0, listKey.length-1);
    //             y = listKey[index];
    //             listKey[index] = listKey.pop();
    //
    //             arr[Math.floor(x/col)][x%col-1] = arr[Math.floor(x/col)][(y%col-1)] = value;
    //
    //         })
    //     }
    //     return arr;
    // }


    render() {
        const boardGame = this.state.items.map((item,i) =>
            <div className="board-row">
                {
                    item.map((square,j) => this.renderSquare(square, i, j))
                }
            </div>
        );

        return (
            <div>
                {boardGame}
            </div>
        );
    }
}


export default Board;

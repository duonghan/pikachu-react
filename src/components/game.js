import React from 'react';
import Board from './board';

"use strict";
const row = 7;
const col = 14;
const amount = 36;

class Game extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            items : this.generateBoard(row,col,amount),
            score: 0,
            square1: null,
            square2: null
        };

        // this.handleClick = this.handleClick.bind(this);
        this.rndNum = this.rndNum.bind(this);
        this.generateBoard = this.generateBoard.bind(this);
    }

    rndNum(a,b){
        return Math.floor(Math.random()*(b-a)) + a;
    }

    // generateBoard(row, col, amount){
    //     let arr = new Array(row+2);
    //     let temp = new Array(); //Contain index of pokemon in first-half board.

    //     for(let i=0; i< row+2; i++){            
    //         arr[i] = new Array(col+2).fill(0);

    //         if(i == 0 || i == row+1) continue;

    //         let num;

    //         for(let j=1; j<= col; j++){
    //             if((i-1)*col + j <= row*col/2){   //Conditional to clone half board.
    //                 num = this.rndNum(1,amount);
    //                 arr[i][j] = num;
    //                 temp.push(num);
    //             }else{
    //                 let index = this.rndNum(0, temp.length - 1);
    //                 arr[i][j] = temp[index];
    //                 temp[index] = temp.pop();
    //             }
    //         }
    //     }

    //     return arr;
    // }

    generateBoard(row, col, amount){
        let arr = new Array(row);
        let temp = new Array(); //Contain index of pokemon in first-half board.

        for(let i=0; i< row; i++){            
            arr[i] = new Array(col);
            let num;

            for(let j=1; j<= col; j++){
                if(i*col + j + 1 <= row*col/2){   //Conditional to clone half board.
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

    handleClick = (i, j) => {
        if(!this.state.square1){
            this.setState({
                square1: {x: i, y: j}
            });
            return;
        }

        if(this.state.square2){
            throw Error('Sai logic lap trinh');
        }

        this.setState({
            square2: {x:i, y:j}
        });

        //Update items
        if(this.isPair(this.state.square1, this.state.square2)){
            let newItems = this.state.items.slice();
            newItems[this.state.square1.x][this.state.square1.y] = newItems[this.state.square2.x][this.state.square2.y] = 0;
            this.setState({
                items: newItems,
                square1: null,
                square2: null});
            
        }


    }

    //test if two points on a line (verticle or horizontal)
    checkLineX = (y1, y2, x) => {
        return [...this.state.items[x]].reduce((sum, item, index)=>{return sum+=(index > Math.min(y1, y2) && index < Math.max(y1, y2)?item:0)},0) === 0;
    }

    checkLineY = (x1, x2, y) => {
        return this.state.items.reduce((sum, item, index)=>{return sum+=(index > Math.min(x1, x2) && index < Math.max(x1, x2)?item[y]:0)},0) === 0;
    }

    //test if two points in bound of the rectangle
    checkRectX = (p1, p2) =>{
        let pleft = p1;
        let pright = p2;

        if(p1.y > p2.y){
            pleft = p2;
            pright = p1;
        }

        // [...Array(pright.y+1).keys()].filter((value) => value > pleft.y && value < pright.y).map(value => {
            
        // });

        for(let yi=pleft.y+1; yi< pright.y; yi++){
            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineY(pleft.x, pright.x, yi) && this.checkLineX(yi, pright.y, pright.x)){
                return true;
            }
        }

        return false;
    }

    checkRectY = (p1, p2) => {
        let pup = p1;
        let pdown = p2;

        if(p1.x > p2.x){
            pup = p2;
            pdown = p1;
        }

        // [...Array(pdown.y+1).keys()].filter((value) => value > pup.y && value < pdown.y).map(value => {
            
        // });

        for(let xi=pup.x+1; xi< pdown.x; xi++){
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineX(pup.y, pdown.y, xi) && this.checkLineY(xi, pdown.x, pdown.y)){
                return true;
            }
        }

        return false;
    }

    //test if two points out of bound of the rectangle
    checkExtendX = (p1, p2, maxY) => {
        let pleft = p1;
        let pright = p2;

        if(p1.y > p2.y){
            pleft = p2;
            pright = p1;
        }

        //left to right
        for(let yi = pright.y+1; yi<= maxY; yi++){
            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineX(pright.y, yi, pright.x) && (this.checkLineY(pleft.x, pright.x, yi) || yi === maxY)){
                return true;
            }
        }

        //right to left
        for(let yi = pleft.y-1; yi >= 0; yi--){
            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineX(pright.y, yi, pright.x) && (this.checkLineY(pleft.x, pright.x, yi) || yi === 0)){
                return true;
            }
        }

        return false;
    }

    checkExtendY = (p1, p2, maxX) => {
        let pup = p1;
        let pdown = p2;

        if(p1.x > p2.x){
            pup = p2;
            pdown = p1;
        }

        //up to down
        for(let xi = pdown.x+1; xi<= maxX; xi++){
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineY(pdown.x, xi, pdown.y) && (this.checkLineX(pup.y, pdown.y, xi) || xi === maxX)){
                return true;
            }
        }

        //down to up
        for(let xi = pup.y-1; xi >= 0; xi--){
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineY(pdown.x, xi, pdown.y) && (this.checkLineX(pup.y, pdown.y, xi) || xi === 0)){
                return true;
            }
        }

        return false;
    }

    isPair = (p1, p2) => {
        if(p1 && p2){
            let x1 = p1.x;
            let y1 = p1.y;

            let x2 = p2.x;
            let y2 = p2.y;

            if(this.state.items[x1][y1] === this.state.items[x2][y2]){
                //Case1: two points in the same line
                if(x1 === x2){
                   return this.checkLineX(y1, y2, x1);
                }

                if(y1 === y2){
                    return this.checkLineY(x1, x2, y1);
                }

                //Case2: two points in bound of the rectangle
                if(this.checkRectX(p1, p2)) return true;
                if(this.checkRectY(p1, p2)) return true;

                //Case2: two points out of bound of the rectangle
                if(this.checkExtendX(p1, p2, col-1)) return true;
                if(this.checkExtendY(p1, p2, row-1)) return true;
            }
        }

        return false;
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares = {this.state.items}
                        onClick={(i, j) => this.handleClick(i,j)}
                        current={this.state}
                    />
                </div>

                <hr/>

                <div className="score-board">
                    <h3>Score: {this.state.score}</h3>
                </div>
            </div>
        );
    }
}


export default Game;

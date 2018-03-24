import React from 'react';
import Board from './board';
import { getBoard } from '../functions/generator';

const row = 7;
const col = 14;
const amount = 36;

class Game extends React.Component {

    constructor(props){
        debugger;
        super(props);

        this.state = {
            items : getBoard(row,col,amount),
            score: 0,
            square1: null,
            square2: null
        };
    }

    componentWillMount() {
        debugger;
    }
    componentDidMount () {
        debugger;
    }
    componentWillReceiveProps() {
        debugger;
    }
    shouldComponentUpdate() {
        debugger;
        return true;
    }
    componentWillUnmount() {
        debugger;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.square1 && this.state.square2) {
            if(this.isPair(this.state.square1, this.state.square2)){
                let newItems = this.state.items.slice();
                newItems[this.state.square1.x][this.state.square1.y] = newItems[this.state.square2.x][this.state.square2.y] = 0;
                    debugger;
                this.setState({
                    items: newItems,
                    score: prevState.score + 20,
                });

            }
            this.setState({
                square1: null,
                square2: null
            });
        }
    }
    
    // test if two points on a line (vertical or horizontal)
    checkLineX = (y1, y2, x) => {
        return [...this.state.items[x]].reduce((sum, item, index)=>{return sum+=(index > Math.min(y1, y2) && index < Math.max(y1, y2)?item:0)},0) === 0;
    };

    checkLineY = (x1, x2, y) => {
        return this.state.items.reduce((sum, item, index)=>{return sum+=(index > Math.min(x1, x2) && index < Math.max(x1, x2)?item[y]:0)},0) === 0;
    };

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
            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineY(pleft.x, pright.x, yi) && this.checkLineX(yi, pright.y, pright.x) && this.state.items[pleft.x][yi] == 0 && this.state.items[pright.x][yi] == 0){
                return true;
            }
        }

        return false;
    };

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
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineX(pup.y, pdown.y, xi) && this.checkLineY(xi, pdown.x, pdown.y)&& this.state.items[xi][pup.y] == 0 && this.state.items[xi][pdown.y] == 0){
                return true;
            }
        }

        return false;
    };
    //test if two points out of bound of the rectangle
    checkExtendX = (p1, p2, maxY) => {
        let pleft = p1;
        let pright = p2;

        if(p1.y > p2.y){
            pleft = p2;
            pright = p1;
        }
        

        //left to right
        for(let yi = pright.y+1; yi<= maxY+1; yi++){
            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineX(pright.y, yi, pright.x) && this.checkLineY(pleft.x, pright.x, yi) && this.state.items[pleft.x][yi] == 0 && this.state.items[pright.x][yi] == 0){
                return true;
            }
        }

        //right to left
        for(let yi = pleft.y-1; yi >= 0; yi--){
            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineX(pright.y, yi, pright.x) && this.checkLineY(pleft.x, pright.x, yi) && this.state.items[pleft.x][yi] == 0 && this.state.items[pright.x][yi] == 0){
                return true;
            }
        }

        return false;
    };

    checkExtendY = (p1, p2, maxX) => {
        let pup = p1;
        let pdown = p2;

        if(p1.x > p2.x){
            pup = p2;
            pdown = p1;
        }
        
        //up to down
        for(let xi = pdown.x+1; xi<= maxX+1; xi++){
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineY(pdown.x, xi, pdown.y) && this.checkLineX(pup.y, pdown.y, xi) && this.state.items[xi][pup.y] == 0 && this.state.items[xi][pdown.y] == 0){
                return true;
            }
        }

        //down to up
        for(let xi = pup.y-1; xi >= 0; xi--){
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineY(pdown.x, xi, pdown.y) && this.checkLineX(pup.y, pdown.y, xi)&& this.state.items[xi][pup.y] == 0 && this.state.items[xi][pdown.y] == 0){
                return true;
            }
        }

        return false;
    };

    handleClick = (i, j) => {
        debugger;

        //Check if this items is out of board
        if(this.state.items[i][j] === 0) return;

        if(!this.state.square1){
            this.setState({
                square1: {x: i, y: j}
            });
            return;
        }

        // if(this.state.square2){
        //     throw Error('Sai logic lap trinh');
        // }
       
        this.setState({
            square2: {x:i, y:j}
        });
    };

    /**
     * Tra ve trang thai an diem. True: co the an diem. False: khong.
     * @param p1
     * @param p2
     * @returns {*}
     */
    isPair = (p1, p2) => {
        if (!p1 || !p2) {
            throw Error('p1, p2 bat buoc co gia tri.');
        }

        let x1 = p1.x;
        let y1 = p1.y;

        let x2 = p2.x;
        let y2 = p2.y;

        if(this.state.items[x1][y1] !== this.state.items[x2][y2] || (x1 === x2 && y1 === y2)) {
            return false;
        }
        // Case1: Tren cung 1 hang
        if(x1 === x2 && this.checkLineX(y1, y2, x1)) return true;

        // Case 2: tren cung 1 cot
        if(y1 === y2 && this.checkLineY(x1, x2, y1)) return true;

        // Case3: two points in bound of the rectangle
        if(this.checkRectX(p1, p2)) return true;

        if(this.checkRectY(p1, p2)) return true;

        //Case2: two points out of bound of the rectangle
        if(this.checkExtendX(p1, p2, col)) return true;

        if(this.checkExtendY(p1, p2, row)) return true;

        return false;
    };

    render() {
        debugger;
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares = {this.state.items}
                        onClick={this.handleClick}
                        // current={this.state}
                        square1={this.state.square1}
                        square2={this.state.square2}
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
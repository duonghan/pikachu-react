/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import Board from './Board';
import { getBoard, reloadBoard, getListPosItem} from '../functions/generator';
import Timer from './Timer';
import {moveTop2Down, moveTop2Down, moveRight2Left, moveLeft2Right, move3CenterLeftRight, move3CenterTopDown, move3OutLeftRight, move3OutTopDown} from './Lervels';
// import { ProgressBar } from 'react-bootstrap';

const row = 7;
const col = 14;
const amount = 36;
let lines = [];
let lastLines = [];
let count = 0; // number of correct items
let i, j, k;  // iterator
let isJustReloaded = false;
let isNew = false;
let newItems;

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: getBoard(row, col, amount),
            score: 0,
            square1: null,
            square2: null,
            reload: 10,
            time: 360,
        };

        this.hasLine = false;
        this.doneLine = false;
        this.listPosItem = getListPosItem();
        this.correctItems = new Array(amount + 1);
    }

    // componentWillMount() {
    //     debugger;
    // }
    componentDidMount() {
        if(!this.isExist()) this.reloadHandler();
    }
    // componentWillReceiveProps() {
    //     debugger;
    // }
    // shouldComponentUpdate() {
    //     debugger;
    //     return true;
    // }
    // componentWillUnmount() {
    //     debugger;
    // }

    componentDidUpdate(prevProps, prevState) {
        if(isJustReloaded || isNew) {
            if(!this.isExist()) {
                this.reloadHandler();
                isJustReloaded = false;
                isNew = false;
            }
        }

        // Vong4
        if(this.doneLine) {
            lastLines.map((line) =>{
                newItems[line.x][line.y] = 0;
            });

            // console.log(lastLines);

            newItems[this.state.square1.x][this.state.square1.y] = newItems[this.state.square2.x][this.state.square2.y] = 0;
            lastLines = [];

             // -------------------- startLevel2---------------------------

            // level2Top-Down
            // newItems = this.moveTop2Down(newItems, this.state.square1.y);
            // newItems = this.moveTop2Down(newItems, this.state.square2.y);

            // level2Down-top
            // newItems = this.moveDown2Top(newItems, this.state.square1.y);
            // newItems = this.moveDown2Top(newItems, this.state.square2.y);

            // level2Right-Left
            // newItems = this.moveRight2Left(newItems, this.state.square1.x);
            // newItems = this.moveRight2Left(newItems, this.state.square2.x);

            // level2Left-Right
             // newItems = this.moveLeft2Right(newItems, this.state.square1.x);
             // newItems = this.moveLeft2Right(newItems, this.state.square2.x);

            // --------------------end Level2----------------------


            // -----------------------startLevel3-----------------------------

            // level3-center-left-right
            newItems = this.move3CenterLeftRight(newItems, this.state.square1.x, this.state.square1.y);
            newItems = this.move3CenterLeftRight(newItems, this.state.square2.x, this.state.square2.y);

            // level3-center-Top- Down
            // newItems = this.move3CenterTopDown(newItems, this.state.square1.y, this.state.square1.x);
            // newItems = this.move3CenterTopDown(newItems, this.state.square2.y, this.state.square2.x);

            // level3-Out-Left-Right
           // newItems = this.move3OutLeftRight(newItems, this.state.square1.x, this.state.square1.y);
             // newItems = this.move3OutLeftRight(newItems, this.state.square2.x,this.state.square2.y);

            // level3-Out TopDown
            // newItems = this.move3OutTopDown(newItems, this.state.square1.x, this.state.square1.y);
             // newItems = this.move3OutTopDown(newItems, this.state.square2.x, this.state.square2.y);
            // -----------------------endLevel3-----------------------------------

            setTimeout(
                () => {
                    this.setState({
                        items: newItems,
                        square1: null,
                        square2: null
                    });

                    if(!this.isExist()) {
                        this.reloadHandler();
                    }
                }, 500
            );

            this.doneLine = false;
            return;
        }

        // Vong3
        if(this.hasLine) {
            this.hasLine = false;
            this.doneLine = true;

            this.setState({
                items: newItems,
            });

            return;
        }

        // Vong 1
        if (this.state.square1 && this.state.square2) {
            newItems = this.state.items.slice();
            const value = newItems[this.state.square1.x][this.state.square1.y];

            // Vong 2
            for(i = 0; i < this.correctItems[value].length; i++) {
                if ((this.correctItems[value][i].square1.x === this.state.square1.x
                    && this.correctItems[value][i].square1.y === this.state.square1.y
                    && this.correctItems[value][i].square2.x === this.state.square2.x
                    && this.correctItems[value][i].square2.y === this.state.square2.y)
                    || (this.correctItems[value][i].square2.x === this.state.square1.x
                        && this.correctItems[value][i].square2.y === this.state.square1.y
                        && this.correctItems[value][i].square1.x === this.state.square2.x
                        && this.correctItems[value][i].square1.y === this.state.square2.y)
                    ) {
                    lastLines = this.correctItems[value][i].lines.slice();

                    if (lastLines.length > 0) {
                        lastLines.map((line) => {
                            newItems[line.x][line.y] = line.value;
                        });
                    }

                    this.setState({
                        score: prevState.score + 20,
                    });

                    this.hasLine = true;

                    // remove from listPosItems
                    this.listPosItem[value][this.correctItems[value][i].item1] = this.listPosItem[value][this.listPosItem[value].length - 1];
                    this.listPosItem[value].pop();
                    this.listPosItem[value][this.correctItems[value][i].item2] = this.listPosItem[value][this.listPosItem[value].length - 1];
                    this.listPosItem[value].pop();

                    // remove couple from correctItems array
                    this.correctItems[value][i] = this.correctItems[value][this.correctItems[value].length - 1];
                    this.correctItems[value].pop();

                    count --;

                    return;
                }
            }

            lines = [];
            this.setState({
                square1: null,
                square2: null
            });
        }
    }

    // test if two points on a line (vertical or horizontal)
    checkLineX = (y1, y2, x) => {
        // return [...this.state.items[x]].reduce((sum, item, index)=>{return sum+=(index > Math.min(y1, y2) && index < Math.max(y1, y2)?item:0)},0) === 0;

        const yleft = Math.min(y1, y2);
        const yright = Math.max(y1, y2);
        const tmp = [];

        for( let yi = yleft + 1; yi < yright; yi++) {
            if(this.state.items[x][yi] !== 0) {
                return false;
            }

            tmp.push({x: x, y: yi, value: 'horizonal'});
        }

        lines.push(...tmp);
        return true;
    };

    checkLineY = (x1, x2, y) => {
        // return this.state.items.reduce((sum, item, index)=>{return sum+=(index > Math.min(x1, x2) && index < Math.max(x1, x2)?item[y]:0)},0) === 0;

        const xup = Math.min(x1, x2);
        const xdown = Math.max(x1, x2);
        const tmp = [];

        for( let xi = xup + 1; xi < xdown; xi++) {
            if(this.state.items[xi][y] !== 0) {
                return false;
            }
            tmp.push({x: xi, y: y, value: 'vertical'});
        }

        lines.push(...tmp);
        return true;
    };

    // test if two points in bound of the rectangle
    checkRectX = (p1, p2) =>{
        let pleft = p1;
        let pright = p2;

        if(p1.y > p2.y) {
            pleft = p2;
            pright = p1;
        }

        // [...Array(pright.y+1).keys()].filter((value) => value > pleft.y && value < pright.y).map(value => {

        // });
        lines = [];
        for(let yi = pleft.y + 1; yi < pright.y; yi++) {
            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineY(pleft.x, pright.x, yi) && this.checkLineX(yi, pright.y, pright.x) && this.state.items[pleft.x][yi] === 0 && this.state.items[pright.x][yi] === 0) {
                if(pleft.x > pright.x) {
                    lines.push({x: pleft.x, y: yi, value: 'top_left'}, {x: pright.x, y: yi, value: 'bottom_right'});
                }else{
                    lines.push({x: pleft.x, y: yi, value: 'bottom_left'}, {x: pright.x, y: yi, value: 'top_right'});
                }

                return true;
            }
        }

        return false;
    };

    checkRectY = (p1, p2) => {
        let pup = p1;
        let pdown = p2;

        if(p1.x > p2.x) {
            pup = p2;
            pdown = p1;
        }

        // [...Array(pdown.y+1).keys()].filter((value) => value > pup.y && value < pdown.y).map(value => {

        // });
        lines = [];
        for(let xi = pup.x + 1; xi < pdown.x; xi++) {
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineX(pup.y, pdown.y, xi) && this.checkLineY(xi, pdown.x, pdown.y) && this.state.items[xi][pup.y] === 0 && this.state.items[xi][pdown.y] === 0) {
                if(pup.y > pdown.y) {
                    lines.push({x: xi, y: pup.y, value: 'top_left'}, {x: xi, y: pdown.y, value: 'bottom_right'});
                }else{
                    lines.push({x: xi, y: pup.y, value: 'top_right'}, {x: xi, y: pdown.y, value: 'bottom_left'});
                }

                return true;
            }
        }

        return false;
    };

    // test if tow point in edge of rectangle
    checkEdge = (p1, p2) =>{
        let pleft = p1;
        let pright = p2;

        if(p1.y > p2.y) {
            pleft = p2;
            pright = p1;
        }

        let p = {x: pright.x, y: pleft.y};
        if(this.state.items[p.x][p.y] === 0) {
            lines = [];

            if(this.checkLineX(p.y, pright.y, p.x) && this.checkLineY(p.x, pleft.x, p.y)) {
                if(pleft.x > pright.x) {lines.push({x: p.x, y: p.y, value: 'bottom_right'});} else {lines.push({x: p.x, y: p.y, value: 'top_right'});}
                return true;
            }
        }

        lines = [];
        p = {x: pleft.x, y: pright.y};
        if(this.state.items[p.x][p.y] !== 0) return false;

        if(this.checkLineX(p.y, pleft.y, p.x) && this.checkLineY(p.x, pright.x, p.y)) {
            if(pleft.x > pright.x) {lines.push({x: p.x, y: p.y, value: 'top_left'});} else {lines.push({x: p.x, y: p.y, value: 'bottom_left'});}
            return true;
        }

        return false;
    };

    // test if two points out of bound of the rectangle
    checkExtendX = (p1, p2, maxY) => {
        let pleft = p1;
        let pright = p2;

        if(p1.y > p2.y) {
            pleft = p2;
            pright = p1;
        }

        // left to right
        lines = [];
        for(let yi = pleft.y + 1; yi <= pright.y; yi++) {
            lines.push({x: pleft.x, y: yi, value: 'horizonal'});
        }

        for(let yi = pright.y + 1; yi <= maxY + 1; yi++) {
            lines.push({x: pleft.x, y: yi, value: 'horizonal'}, {x: pright.x, y: yi, value: 'horizonal'});

            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineX(pright.y, yi, pright.x) && this.checkLineY(pleft.x, pright.x, yi) && this.state.items[pleft.x][yi] === 0 && this.state.items[pright.x][yi] === 0) {
                if(pleft.x > pright.x) {
                    lines.push({x: pleft.x, y: yi, value: 'top_left'}, {x: pright.x, y: yi, value: 'bottom_left'});
                }else{
                    lines.push({x: pleft.x, y: yi, value: 'bottom_left'}, {x: pright.x, y: yi, value: 'top_left'});
                }

                return true;
            }
        }

        // right to left
        lines = [];
        for(let yi = pright.y - 1; yi >= pleft.y; yi--) {
            lines.push({x: pright.x, y: yi, value: 'horizonal'});
        }
        for(let yi = pleft.y - 1; yi >= 0; yi--) {
            lines.push({x: pleft.x, y: yi, value: 'horizonal'}, {x: pright.x, y: yi, value: 'horizonal'});

            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineX(pright.y, yi, pright.x) && this.checkLineY(pleft.x, pright.x, yi) && this.state.items[pleft.x][yi] === 0 && this.state.items[pright.x][yi] === 0) {
                if(pleft.x > pright.x) {
                    lines.push({x: pleft.x, y: yi, value: 'top_right'}, {x: pright.x, y: yi, value: 'bottom_right'});
                }else{
                    lines.push({x: pleft.x, y: yi, value: 'bottom_right'}, {x: pright.x, y: yi, value: 'top_right'});
                }
                return true;
            }
        }

        return false;
    };

    checkExtendY = (p1, p2, maxX) => {
        let pup = p1;
        let pdown = p2;

        if(p1.x > p2.x) {
            pup = p2;
            pdown = p1;
        }

        // up to down
        lines = [];
        for(let xi = pup.x + 1; xi <= pdown.x; xi++) {
            lines.push({x: xi, y: pup.y, value: 'vertical'});
        }

        for(let xi = pdown.x + 1; xi <= maxX + 1; xi++) {
            lines.push({x: xi, y: pup.y, value: 'vertical'}, {x: xi, y: pdown.y, value: 'vertical'});
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineY(pdown.x, xi, pdown.y) && this.checkLineX(pup.y, pdown.y, xi) && this.state.items[xi][pup.y] === 0 && this.state.items[xi][pdown.y] === 0) {
                if(pup.y > pdown.y) {
                    lines.push({x: xi, y: pup.y, value: 'top_left'}, {x: xi, y: pdown.y, value: 'top_right'});
                }else{
                    lines.push({x: xi, y: pup.y, value: 'top_right'}, {x: xi, y: pdown.y, value: 'top_left'});
                }
                return true;
            }
        }

        // down to up
        lines = [];
        for(let xi = pdown.x - 1; xi >= pup.x; xi--) {
            lines.push({x: xi, y: pdown.y, value: 'vertical'});
        }
        for(let xi = pup.x - 1; xi >= 0; xi--) {
            lines.push({x: xi, y: pup.y, value: 'vertical'}, {x: xi, y: pdown.y, value: 'vertical'});
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineY(pdown.x, xi, pdown.y) && this.checkLineX(pup.y, pdown.y, xi) && this.state.items[xi][pup.y] === 0 && this.state.items[xi][pdown.y] === 0) {
                if(pup.y > pdown.y) {
                    lines.push({x: xi, y: pup.y, value: 'bottom_left'}, {x: xi, y: pdown.y, value: 'bottom_right'});
                }else{
                    lines.push({x: xi, y: pup.y, value: 'bottom_right'}, {x: xi, y: pdown.y, value: 'bottom_left'});
                }
                return true;
            }
        }

        return false;
    };

    handleClick = (i, j) => {
        // Check if this items is out of board
        if(this.state.items[i][j] === 0) return;

        if(!this.state.square1) {
            this.setState({
                square1: {x: i, y: j}
            });
            return;
        }

        // if(this.state.square2){
        //     throw Error('Sai logic lap trinh');
        // }

        this.setState({
            square2: {x: i, y: j}
        });
    };

    reloadHandler = () => {
        if(this.state.reload <= 0) {
            if(window.confirm('You losed! Restart game?')) {this.renew();}
        }else{
            const oldItems = this.state.items.slice();
            const _newItems = reloadBoard(oldItems, row, col, amount);

            this.setState({
                items: _newItems,
                reload: this.state.reload - 1,
            });

            this.listPosItem = getListPosItem();
        }

        isJustReloaded = true;
    };

    renew() {
        // save score into log...
        this.setState({
            items: getBoard(row, col, amount),
            score: 0,
            reload: 10,
            time: 360,
        });

        this.listPosItem = getListPosItem();
        this.correctItems = new Array(amount + 1);
        isNew = true;
    }


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

        const x1 = p1.x;
        const y1 = p1.y;

        const x2 = p2.x;
        const y2 = p2.y;

        if(this.state.items[x1][y1] !== this.state.items[x2][y2] || (x1 === x2 && y1 === y2)) {
            return false;
        }
        // Case1: Tren cung 1 hang
        if(x1 === x2 && this.checkLineX(y1, y2, x1)) return true;

        // Case 2: tren cung 1 cot
        if(y1 === y2 && this.checkLineY(x1, x2, y1)) return true;

        // Case 3+4: two points int edge of the rectangle
        if(this.checkEdge(p1, p2)) return true;

        // Case 5: two points in bound of the rectangle
        if(this.checkRectX(p1, p2)) return true;

        if(this.checkRectY(p1, p2)) return true;

        // Case6: two points out of bound of the rectangle
        if(this.checkExtendX(p1, p2, col)) return true;

        if(this.checkExtendY(p1, p2, row)) return true;

        return false;
    };

    /**
     * Kiem tra xem con truong hop nao an duoc khong??
     * @returns {boolean}
     */
    isExist() {
        count = 0;

        // Khởi tạo mảng 2 chiều
        this.correctItems = [...Array(amount + 1)].fill(null).map((_) => new Array());

        // duyệt từng pokemon xem các vị trí của nó trên board có thể ăn được hay không
        for(i = 1; i < this.listPosItem.length; i++) {
            // Case 1: 0 item
            if(!this.listPosItem[i] || this.listPosItem[i].length === 0) continue;

            // Case 2: 2, 4, 6... items
            for(j = 0; j < this.listPosItem[i].length; j++) {
                for(k = j + 1; k < this.listPosItem[i].length; k++) {
                    lines = [];
                    if(this.isPair(this.listPosItem[i][j], this.listPosItem[i][k])) {
                        this.correctItems[i].push({square1: this.listPosItem[i][j], square2: this.listPosItem[i][k], lines: lines, item1: j, item2: k});
                        count ++;
                    }
                }
            }
        }

        if(count > 0) return true;

        return false;
    }

    onTimeout = () =>{
        if(window.confirm('You losed! Restart game?')) {this.renew();}
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares = {this.state.items}
                        onClick={this.handleClick}
                        square1={this.state.square1}
                        square2={this.state.square2}
                    />
                </div>

                <hr/>

                <div className="score-board">
                    <Timer width={this.state.time} onFinishInterval={this.onTimeout}/>
                    <h3>Score: {this.state.score === 980 ? 'You win' : this.state.score}</h3>
                    <h4>Reload Time Count: {this.state.reload}</h4>
                    <button onClick={this.reloadHandler}>Reload</button>
                </div>
            </div>
        );
    }

}

export default Game;

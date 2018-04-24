/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import Board from './Board';
import { getBoard, reloadBoard} from '../functions/Generator';
import {getListPosItem} from '../functions/Binder';
import Timer from './Timer';
import { moveTop2Down, moveDown2Top, moveRight2Left, moveLeft2Right, move3CenterLeftRight, move3CenterTopDown, move3OutLeftRight, move3OutTopDown } from './Level';
// import { ProgressBar } from 'react-bootstrap';
import ScoreBoard from "./ScoreBoard";
import Fireworks from 'fireworks-react';

let i, j, k;  // iterator

class Game extends React.Component {

    /**
     * @description update items board when reload event is triggered
     */
    reloadHandler = () => {
        if(this.state.reload <= 0) {
            if(window.confirm('You lost! Restart game?')) {this.renew();}
        }else{
            const oldItems = this.state.items.slice();
            const _newItems = reloadBoard(oldItems, this.row, this.col, this.amount);

            this.setState({
                items: _newItems,
                reload: this.state.reload - 1,
            });

            this.listPosItem = getListPosItem(_newItems, this.row, this.col, this.amount);

            this.setState({
                isJustReloaded: true,
            });
        }
    };
    /**
     * @description: create new board and do something when level up
     */
    doNextLevel = () => {
        const _newItems = getBoard(this.row, this.col, this.amount);

        this.setState({
            items: _newItems,
            reload: this.state.reload + 1,
            time: this.time,
            isNew: true,
            level: this.state.level + 1,
        });

        this.listPosItem = getListPosItem(_newItems, this.row, this.col, this.amount);
    };
    onTimeout = () =>{
        if(window.confirm('You lost cuz timeout! Restart game?')) {this.renew();}
    };

    /**
     * @description test if two points on a line (vertical or horizontal)
     * @param abscissa of first item
     * @param abscissa of next item
     * @param ordinate of two items
     * @returns {boolean}
     */
    checkLineX = (y1, y2, x) => {
        const yleft = Math.min(y1, y2);
        const yright = Math.max(y1, y2);
        const tmp = [];

        for( let yi = yleft + 1; yi < yright; yi++) {
            if(this.state.items[x][yi] !== 0) {
                return false;
            }

            tmp.push({x: x, y: yi, value: 'horizontal'});
        }

        this.lines.push(...tmp);
        return true;
    };
    checkLineY = (x1, x2, y) => {
        const xup = Math.min(x1, x2);
        const xdown = Math.max(x1, x2);
        const tmp = [];

        for( let xi = xup + 1; xi < xdown; xi++) {
            if(this.state.items[xi][y] !== 0) {
                return false;
            }
            tmp.push({x: xi, y: y, value: 'vertical'});
        }

        this.lines.push(...tmp);
        return true;
    };

    /**
     * @description test if two points in bound of the rectangle
     * @param p1: 1th point
     * @param p2: 2nd point
     * @returns {boolean}
     */
    checkRectX = (p1, p2) =>{
        let pleft = p1;
        let pright = p2;

        if(p1.y > p2.y) {
            pleft = p2;
            pright = p1;
        }

        this.lines = [];
        for(let yi = pleft.y + 1; yi < pright.y; yi++) {
            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineY(pleft.x, pright.x, yi) && this.checkLineX(yi, pright.y, pright.x) && this.state.items[pleft.x][yi] === 0 && this.state.items[pright.x][yi] === 0) {
                if(pleft.x > pright.x) {
                    this.lines.push({x: pleft.x, y: yi, value: 'top_left'}, {x: pright.x, y: yi, value: 'bottom_right'});
                }else{
                    this.lines.push({x: pleft.x, y: yi, value: 'bottom_left'}, {x: pright.x, y: yi, value: 'top_right'});
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

        this.lines = [];
        for(let xi = pup.x + 1; xi < pdown.x; xi++) {
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineX(pup.y, pdown.y, xi) && this.checkLineY(xi, pdown.x, pdown.y) && this.state.items[xi][pup.y] === 0 && this.state.items[xi][pdown.y] === 0) {
                if(pup.y > pdown.y) {
                    this.lines.push({x: xi, y: pup.y, value: 'top_left'}, {x: xi, y: pdown.y, value: 'bottom_right'});
                }else{
                    this.lines.push({x: xi, y: pup.y, value: 'top_right'}, {x: xi, y: pdown.y, value: 'bottom_left'});
                }

                return true;
            }
        }

        return false;
    };

    /**
     * @description test if tow point in edge of rectangle
     * @param p1: 1st point
     * @param p2: 2nd point
     * @returns {boolean}
     */
    checkEdge = (p1, p2) =>{
        let pleft = p1;
        let pright = p2;

        if(p1.y > p2.y) {
            pleft = p2;
            pright = p1;
        }

        let p = {x: pright.x, y: pleft.y};
        if(this.state.items[p.x][p.y] === 0) {
            this.lines = [];

            if(this.checkLineX(p.y, pright.y, p.x) && this.checkLineY(p.x, pleft.x, p.y)) {
                if(pleft.x > pright.x) {this.lines.push({x: p.x, y: p.y, value: 'bottom_right'});} else {this.lines.push({x: p.x, y: p.y, value: 'top_right'});}
                return true;
            }
        }

        this.lines = [];
        p = {x: pleft.x, y: pright.y};
        if(this.state.items[p.x][p.y] !== 0) return false;

        if(this.checkLineX(p.y, pleft.y, p.x) && this.checkLineY(p.x, pright.x, p.y)) {
            if(pleft.x > pright.x) {this.lines.push({x: p.x, y: p.y, value: 'top_left'});} else {this.lines.push({x: p.x, y: p.y, value: 'bottom_left'});}
            return true;
        }

        return false;
    };

    /**
     * @description test if two points out of bound of the rectangle
     * @param p1: 1st point
     * @param p2: 2nd point
     * @param maxY
     * @returns {boolean}
     */
    checkExtendX = (p1, p2, maxY) => {
        let pleft = p1;
        let pright = p2;

        if(p1.y > p2.y) {
            pleft = p2;
            pright = p1;
        }

        // left to right
        this.lines = [];
        for(let yi = pleft.y + 1; yi <= pright.y; yi++) {
            this.lines.push({x: pleft.x, y: yi, value: 'horizontal'});
        }

        for(let yi = pright.y + 1; yi <= maxY + 1; yi++) {
            this.lines.push({x: pleft.x, y: yi, value: 'horizontal'}, {x: pright.x, y: yi, value: 'horizontal'});

            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineX(pright.y, yi, pright.x) && this.checkLineY(pleft.x, pright.x, yi) && this.state.items[pleft.x][yi] === 0 && this.state.items[pright.x][yi] === 0) {
                if(pleft.x > pright.x) {
                    this.lines.push({x: pleft.x, y: yi, value: 'top_left'}, {x: pright.x, y: yi, value: 'bottom_left'});
                }else{
                    this.lines.push({x: pleft.x, y: yi, value: 'bottom_left'}, {x: pright.x, y: yi, value: 'top_left'});
                }

                return true;
            }
        }

        // right to left
        this.lines = [];
        for(let yi = pright.y - 1; yi >= pleft.y; yi--) {
            this.lines.push({x: pright.x, y: yi, value: 'horizontal'});
        }
        for(let yi = pleft.y - 1; yi >= 0; yi--) {
            this.lines.push({x: pleft.x, y: yi, value: 'horizontal'}, {x: pright.x, y: yi, value: 'horizontal'});

            if(this.checkLineX(pleft.y, yi, pleft.x) && this.checkLineX(pright.y, yi, pright.x) && this.checkLineY(pleft.x, pright.x, yi) && this.state.items[pleft.x][yi] === 0 && this.state.items[pright.x][yi] === 0) {
                if(pleft.x > pright.x) {
                    this.lines.push({x: pleft.x, y: yi, value: 'top_right'}, {x: pright.x, y: yi, value: 'bottom_right'});
                }else{
                    this.lines.push({x: pleft.x, y: yi, value: 'bottom_right'}, {x: pright.x, y: yi, value: 'top_right'});
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
        this.lines = [];
        for(let xi = pup.x + 1; xi <= pdown.x; xi++) {
            this.lines.push({x: xi, y: pup.y, value: 'vertical'});
        }

        for(let xi = pdown.x + 1; xi <= maxX + 1; xi++) {
            this.lines.push({x: xi, y: pup.y, value: 'vertical'}, {x: xi, y: pdown.y, value: 'vertical'});
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineY(pdown.x, xi, pdown.y) && this.checkLineX(pup.y, pdown.y, xi) && this.state.items[xi][pup.y] === 0 && this.state.items[xi][pdown.y] === 0) {
                if(pup.y > pdown.y) {
                    this.lines.push({x: xi, y: pup.y, value: 'top_left'}, {x: xi, y: pdown.y, value: 'top_right'});
                }else{
                    this.lines.push({x: xi, y: pup.y, value: 'top_right'}, {x: xi, y: pdown.y, value: 'top_left'});
                }
                return true;
            }
        }

        // down to up
        this.lines = [];
        for(let xi = pdown.x - 1; xi >= pup.x; xi--) {
            this.lines.push({x: xi, y: pdown.y, value: 'vertical'});
        }
        for(let xi = pup.x - 1; xi >= 0; xi--) {
            this.lines.push({x: xi, y: pup.y, value: 'vertical'}, {x: xi, y: pdown.y, value: 'vertical'});
            if(this.checkLineY(pup.x, xi, pup.y) && this.checkLineY(pdown.x, xi, pdown.y) && this.checkLineX(pup.y, pdown.y, xi) && this.state.items[xi][pup.y] === 0 && this.state.items[xi][pdown.y] === 0) {
                if(pup.y > pdown.y) {
                    this.lines.push({x: xi, y: pup.y, value: 'bottom_left'}, {x: xi, y: pdown.y, value: 'bottom_right'});
                }else{
                    this.lines.push({x: xi, y: pup.y, value: 'bottom_right'}, {x: xi, y: pdown.y, value: 'bottom_left'});
                }
                return true;
            }
        }

        return false;
    };

    /**
     * @param p1
     * @param p2
     * @returns Trang thai an diem. True: co the an diem. False: khong.
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
        if(this.checkExtendX(p1, p2, this.col)) return true;

        return this.checkExtendY(p1, p2, this.row);
    };

    /**
     * @description add clicked items to state.
     * @param pi: abscissa of item
     * @param pj: ordinate of item
     */
    handleClick = (pi, pj) => {
        // Check if this items is out of board
        if(this.state.items[pi][pj] === 0) return;

        if(!this.state.square1) {
            this.setState({
                square1: {x: pi, y: pj}
            });
            return;
        }

        this.setState({
            square2: {x: pi, y: pj}
        });
    };

    constructor(props) {
        super(props);

        this.row = 7;        // size of game board
        this.col = 14;
        this.amount = 36;       // number of pokemon items
        this.lines = [];       // array contain pokemon connected line (temp array for each isExist method running)
        this.lastLines = [];       // array contain
        this.count = 0;        // number of couple satisfying item case
        this.newItems = [];             // 2-dimension (2d) array contain items whenever items state is changed
        this.time = 360;
        // localStorage.setItem('listScore', JSON.stringify([1000,2000,3000]));
        this.listScore = localStorage.getItem('listScore') ? JSON.parse(localStorage.getItem('listScore')) : new Array(5);
        this.listScoreLength = 5;

        const _new = getBoard(this.row, this.col, this.amount);   // contain items from generator method.

        this.state = {
            items: _new,
            score: 0,
            square1: null,
            square2: null,
            reload: 10,
            time: this.time,
            level: 1,
            isWillReload: false,
            isJustReloaded: false,
            isNew: false
        };

        this.hasLine = false;
        this.doneLine = false;
        this.listPosItem = getListPosItem(_new, this.row, this.col, this.amount);   // contain array of position by
        // value of items
        this.satisfiableItems = new Array(this.amount + 1);     // contain array of position by satisfiable item's value
    }

    /**
     * @description: check game board whenever mount
     */
    componentDidMount() {
        if(!this.isExist()) {
            this.reloadHandler();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // When board is renew
        if(this.state.isNew === true) {
            if(!this.isExist()) {
                this.reloadHandler();
            }

            this.setState({
                isNew: false,
            });
        }

        // When board is reloaded
        if(this.state.isJustReloaded === true) {
            if(!this.isExist()) {
                this.reloadHandler();
            }

            this.setState({
                isJustReloaded: false,
            });
        }

        // Round 5: Check reload board and level up
        if(this.state.isWillReload === true) {
            if(this.state.score === 10 * this.col * this.row * this.state.level) {
                this.doNextLevel();
            }else{
                // update item's position array
                this.listPosItem = getListPosItem(this.newItems, this.row, this.col, this.amount);

                if(!this.isExist()) {
                    this.reloadHandler();
                }
            }

            this.setState({
                isWillReload: false
            });

            return;
        }

        // Round 4: Remove line from board
        if(this.doneLine) {
            this.lastLines.map((line) => this.newItems[line.x][line.y] = 0);

            this.newItems[this.state.square1.x][this.state.square1.y] = this.newItems[this.state.square2.x][this.state.square2.y] = 0;
            this.lastLines = [];
            this.handleLevel(this.state.level);

            setTimeout(
                () => {
                    this.setState({
                        items: this.newItems,
                        square1: null,
                        square2: null,
                        isWillReload: true,
                    });
                }, 500
            );

            this.doneLine = false;
            return;
        }

        // Round 3: Display connected line
        if(this.hasLine) {
            this.hasLine = false;
            this.doneLine = true;

            this.setState({
                items: this.newItems,
            });

            return;
        }

        // Round 1: Check if 2 items is valid (not null) or not
        if (this.state.square1 && this.state.square2) {
            this.newItems = this.state.items.slice();
            const value = this.newItems[this.state.square1.x][this.state.square1.y];

            // Round 2: Check if 2 items is satisfiable or not. If yes then update score and assign lastLines value
            for(i = 0; i < this.satisfiableItems[value].length; i++) { // compare two object
                if ( (this.satisfiableItems[value][i].square1.x === this.state.square1.x
                    && this.satisfiableItems[value][i].square1.y === this.state.square1.y
                    && this.satisfiableItems[value][i].square2.x === this.state.square2.x
                    && this.satisfiableItems[value][i].square2.y === this.state.square2.y)
                    || (this.satisfiableItems[value][i].square2.x === this.state.square1.x
                        && this.satisfiableItems[value][i].square2.y === this.state.square1.y
                        && this.satisfiableItems[value][i].square1.x === this.state.square2.x
                        && this.satisfiableItems[value][i].square1.y === this.state.square2.y)
                ) {
                    this.lastLines = this.satisfiableItems[value][i].lines.slice();

                    if (this.lastLines.length > 0) {
                        this.lastLines.map((line) => this.newItems[line.x][line.y] = line.value);
                    }

                    this.setState({
                        score: prevState.score + 20,
                    });

                    this.hasLine = true;

                    // Remove from listPosItems
                    this.listPosItem[value][this.satisfiableItems[value][i].item1] = this.listPosItem[value][this.listPosItem[value].length - 1];
                    this.listPosItem[value].pop();
                    this.listPosItem[value][this.satisfiableItems[value][i].item2] = this.listPosItem[value][this.listPosItem[value].length - 1];
                    this.listPosItem[value].pop();

                    // Remove couple from satisfiableItems array
                    this.satisfiableItems[value][i] = this.satisfiableItems[value][this.satisfiableItems[value].length - 1];
                    this.satisfiableItems[value].pop();

                    this.count --;

                    return;
                }
            }

            this.lines = [];
            this.setState({
                square1: null,
                square2: null
            });
        }
    }

    /**
     * Kiem tra xem con truong hop nao an duoc khong??
     * @returns {boolean}
     */
    isExist() {
        this.count = 0; // reset count

        // Initialize 2d array
        this.satisfiableItems = [...Array(this.amount + 1)].fill(null).map(() => []);

        // Iterate each item
        for(i = 1; i < this.listPosItem.length; i++) {
            // Case 1: 0 item
            if(!this.listPosItem[i] || this.listPosItem[i].length === 0) continue;

            // Case 2: 2, 4, 6... items
            for(j = 0; j < this.listPosItem[i].length; j++) {
                for(k = j + 1; k < this.listPosItem[i].length; k++) {
                    this.lines = [];
                    if(this.isPair(this.listPosItem[i][j], this.listPosItem[i][k])) {
                        this.satisfiableItems[i].push({square1: this.listPosItem[i][j], square2: this.listPosItem[i][k], lines: this.lines, item1: j, item2: k});
                        this.count ++;
                    }
                }
            }
        }

        return this.count > 0;
    }

    renew() {
        this.saveScore(this.state.score);

        const _newItems = getBoard(this.row, this.col, this.amount);
        this.setState({
            items: _newItems,
            score: 0,
            reload: 10,
            time: this.time,
            level: 1,
            isNew: true
        });

        this.listPosItem = getListPosItem(_newItems, this.row, this.col, this.amount);
        this.satisfiableItems = new Array(this.amount + 1);
    }

    /**
     * @description save score into local storage
     * @param score
     */
    saveScore(score){
        if(score > this.listScore[this.listScoreLength - 1] || this.listScore.length < this.listScoreLength){
            this.listScore.push(score);
        }
        localStorage.setItem("listScore", this.listScore.sort((a,b) => a-b ));
    }

    /**
     * @description do whenever level up
     * @param level
     */
    handleLevel(level) {
        switch (level) {
            case 2:
                // level2Top-Down
                this.newItems = moveTop2Down(this.newItems, this.state.square1.y);
                this.newItems = moveTop2Down(this.newItems, this.state.square2.y);
                break;

            case 3:
                // level2Down-top
                this.newItems = moveDown2Top(this.newItems, this.state.square1.y);
                this.newItems = moveDown2Top(this.newItems, this.state.square2.y);
                break;

            case 4:
                // level2Right-Left
                this.newItems = moveRight2Left(this.newItems, this.state.square1.x);
                this.newItems = moveRight2Left(this.newItems, this.state.square2.x);
                break;

            case 5:
                // level2Left-Right
                this.newItems = moveLeft2Right(this.newItems, this.state.square1.x);
                this.newItems = moveLeft2Right(this.newItems, this.state.square2.x);
                break;

            case 6:
                this.newItems = move3CenterLeftRight(this.newItems, this.state.square1.x, this.state.square1.y);
                this.newItems = move3CenterLeftRight(this.newItems, this.state.square2.x, this.state.square2.y);
                break;

            case 7:
                // level3-center-Top- Down
                this.newItems = move3CenterTopDown(this.newItems, this.state.square1.y, this.state.square1.x);
                this.newItems = move3CenterTopDown(this.newItems, this.state.square2.y, this.state.square2.x);
                break;

            case 8:
                // level3-Out-Left-Right
                this.newItems = move3OutLeftRight(this.newItems, this.state.square1.x, this.state.square1.y);
                this.newItems = move3OutLeftRight(this.newItems, this.state.square2.x, this.state.square2.y);
                break;

            case 9:
                // level3-Out TopDown
                this.newItems = move3OutTopDown(this.newItems, this.state.square1.x, this.state.square1.y);
                this.newItems = move3OutTopDown(this.newItems, this.state.square2.x, this.state.square2.y);
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">

                    <Timer width={this.state.time} onFinishInterval={this.onTimeout} isnew={this.state.isNew} />
                    <Board
                        squares = {this.state.items}
                        onClick={this.handleClick}
                        square1={this.state.square1}
                        square2={this.state.square2}
                    />
                    <Fireworks width={1000} height={1000}></Fireworks>
                </div>

                <hr/>

                <div className="score-board">

                    <h2 className={'level'} >Level: {this.state.level}</h2>
                    <h3 className={'score'} >Score: {this.state.score}</h3>
                    <h4 className={'reload'} >Reload Time Count: {this.state.reload}</h4>
                    {/*<button onClick={this.reloadHandler}>Reload</button>*/}
                    <ScoreBoard score={this.listScore}/>
                </div>

            </div>
        );
    }

}

export default Game;

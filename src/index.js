import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.value = props.value;
    }

    render() {
        return (
            <button className="square">
                <img src={'./images/pokemon_'+ this.value + '.png'} />
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i}/>;
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(1)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


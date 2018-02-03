import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './board';

"use strict";

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


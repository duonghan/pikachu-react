import React from 'react';
import Board from './board';

"use strict";

class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            score: 0
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
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

import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';

class Board extends React.Component {
    renderSquare(i, j, selected) {
        return (
            <Square
                key={`${i}_${j}`} value={this.props.squares[i][j]}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={()=>this.props.onClick(i, j)}
                selected={selected}
            />
        );
    }

    render() {
        const boardGame = this.props.squares.map((item, i) =>
            <div key={i} className="board-row">
                {
                    item.map((square, j) => {
                        let selected = false;

                        if (this.props.square1 &&
                            this.props.square1.x === i &&
                            this.props.square1.y === j) {
                            selected = true;
                        } else if(this.props.square2 &&
                                this.props.square2.x === i &&
                                this.props.square2.y === j) {
                            selected = true;
                        }
                        return this.renderSquare(i, j, selected);
                    })
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

Board.propTypes = {
    squares: PropTypes.array,
    square1: PropTypes.object,
    square2: PropTypes.object,
    onClick: PropTypes.func
};

export default Board;

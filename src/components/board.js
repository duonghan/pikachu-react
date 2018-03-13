import React from 'react';
import Square from './square';



class Board extends React.Component {

    renderSquare(i,j,selected) {
        return <Square
                key={`${i}_${j}`} value={this.props.squares[i][j]}
                onClick={()=>this.props.onClick(i,j)}
                selected={selected}
                />;
    }

    render() {       
        const boardGame = this.props.squares.map((item,i) =>
            <div key={i} className="board-row">
                {
                    item.map((square,j) => {
                        let selected = false;

                        if( this.props.square1 && 
                            this.props.square1.x === i && 
                            this.props.square1.y === j){
                            selected = true;
                        }else if(this.props.square2 &&
                                this.props.square2.x === i && 
                                this.props.square2.y === j){
                            selected = true;
                        }
                        return this.renderSquare(i,j,selected);
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


export default Board;

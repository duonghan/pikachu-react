import React from 'react';

class Square extends React.Component {

    render() {
        return (
            <button
                // className="square"
                className={this.props.value > 0? 'square': 'non-square'}
                onClick={this.props.onClick}
                style={
                    this.props.selected ? {border: '3px solid crimson'}: null
                }>
                <img src={'./images/pokemon_'+ this.props.value + '.png'} />
            </button>
        );
    }
}


export default Square;

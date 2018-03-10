import React from 'react';

class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={this.props.onClick} style={this.props.selected ? {border: '3px solid crimson'}: null}>
                <img src={'./images/pokemon_'+ this.props.value + '.jpg'} />
            </button>
        );
    }
}


export default Square;

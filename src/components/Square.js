import React from 'react';
import PropTypes from 'prop-types';

class Square extends React.Component {
    render() {
        return (
            <button
                className={this.props.value > 0 ? 'square' : 'non-square'}
                onClick={this.props.onClick}
                style={
                    this.props.selected ? {border: '3px solid crimson'} : null
                }
            >
                <img src={'./images/pokemon_' + this.props.value + '.png'} style={this.props.value === 0 ? {display: 'none'} : null} alt=''/>
            </button>
        );
    }
}

Square.propTypes = {
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    value: PropTypes.number
};

export default Square;

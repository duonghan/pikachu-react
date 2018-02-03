import React from 'react';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null
        }
    }

    render() {
        return (
            <button className="square">
                <img src={'./images/pokemon_'+ this.props.value + '.png'} alt={'image '+ this.props.value} />
            </button>
        );
    }
}

export default Square;

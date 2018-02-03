import React from 'react';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.value = props.value;
    }

    render() {
        return (
            <button className="square">
                <img src={'./images/pokemon_'+ this.value + '.png'} alt={'image '+ this.value} />
            </button>
        );
    }
}

export default Square;

import React from 'react';

class Square extends React.Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         value: this.props.value
    //     }
    // }

    render() {
        return (
            <button className="square" onClick={this.props.onClick()}>
                <img src={'./images/pokemon_'+ this.props.value + '.jpg'} alt={'image '+ this.props.value} />
            </button>
        );
    }
}

export default Square;

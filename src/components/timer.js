import React from 'react';

class Timer extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            with: this.props.with,
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.update(),
            1000
        );
    }
  
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    update(){
        if(this.state.with > 0){
            this.setState({
                with: this.state.with - 1,
            });
        }
    }

    render(){
        return(
            <div className="myProgress">
                <div className="myBar" style = {{width: this.state.with/this.props.with*100 +'%' }}></div>
            </div>
        );
    };
}

export default Timer;
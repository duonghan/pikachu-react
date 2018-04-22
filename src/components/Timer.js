import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: this.props.width,
        };
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.update(),
            1000
        );
    }
    componentDidUpdate() {
        if(this.state.width === 0) {
            this.props.onFinishInterval();

            clearInterval(this.timerID);

            this.setState({
                width: this.props.width,
            });

            this.timerID = setInterval(
                () => this.update(),
                1000
            );
        }
    }


    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    update() {
        if(this.state.width > 0) {
            this.setState({
                width: this.state.width - 1,
            });
        }
    }

    render() {
        return(
            <div className="myProgress" >
                <div className="myBar" style = {{width: this.state.width / this.props.width * 100 + '%' }} />
            </div>
        );
    }
}

Timer.propTypes = {
    width: PropTypes.number,
    onFinishInterval: PropTypes.func
};

export default Timer;

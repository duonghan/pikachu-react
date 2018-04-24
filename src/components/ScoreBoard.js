import React from 'react';

class ScoreLine extends React.Component{
    render(){
        return(
            <div className="divTableRow">
                <div className="divTableCell"> {this.props.index + 1} &nbsp;</div>
                <div className="divTableCell"> {this.props.value} &nbsp;</div>
            </div>
        );
    }
};

class ScoreBoard extends React.Component{

    render(){

        const listScore = this.props.score.map((value, index) =>{
            return <ScoreLine index={index} value={value}></ScoreLine>
        });

        return(
            <div>
                <h2>High Score</h2>
                <div className='divTable' style={{width: '50%' , border: '1px solid #000' }}>
                    {listScore}
                </div>
            </div>
        );
    };
}

export default ScoreBoard;
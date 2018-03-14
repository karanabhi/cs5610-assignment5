import React from 'react';
import ReactDOM from 'react-dom';

export class Score extends React.Component{

    constructor(props){
      super(props);
      //this.scores=props.score;
    }

    render(){
      return (
        <div id="scoreDiv">
        Score: 0
        </div>
      );
    }//render ends
  }//Score ends

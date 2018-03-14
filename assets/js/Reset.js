import React from 'react';
import ReactDOM from 'react-dom';
import {Board} from './Board'

export class Reset extends React.Component{
  constructor(props){
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.resetGame = this.resetGame.bind(this);
  }

  resetGame(){
    location.reload();
  }

  render(){
    return(
      <button id="reset" onClick={this.resetGame} className="btn btn-danger center-block">Reset Game</button>
    );
  }//render ends
}//ResetButton Ends

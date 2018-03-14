import React from 'react';
import ReactDOM from 'react-dom';

export class Click extends React.Component{
  constructor(props){
    super(props);
    //this.clicks=props.clicks;
  }

  render(){
    return (
      <div id="clicksCount">
        Click: 0
      </div>
    );
  }//render ends
}//Click ends

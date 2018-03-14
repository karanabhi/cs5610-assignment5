import React from 'react';
import ReactDOM from 'react-dom';
import {Score} from './Score'

export class Board extends React.Component{
  constructor(props) {
    super(props);
    this.obj={
      gameArray:['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'],
      gameValues:[],
      gameTitleIds:[],
      cardsFlipped:0,
      score:0,
      clicks:0,
      op:[]
    }
    this.shuffleArray();
    this.ids="";
  }

  shuffleArray(){
    //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    for (let i = this.obj.gameArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.obj.gameArray[i], this.obj.gameArray[j]] = [this.obj.gameArray[j], this.obj.gameArray[i]];
    }
  }//shuffleArray() Ends

  //memoryFlipCard()
  memoryFlipCard(card,val,obj1){
    obj1.clicks++;
    document.getElementById("clicksCount").innerHTML="Clicks: "+obj1.clicks;
    card=document.getElementById(card);

    if(card.innerHTML=="" && obj1.gameValues.length<2){
      card.style.background="white";
      card.innerHTML=val;

      if(obj1.gameValues.length==0){
        obj1.gameValues.push(val);
        obj1.gameTitleIds.push(card.id);

      }else if(obj1.gameValues.length==1){
        obj1.gameValues.push(val);
        obj1.gameTitleIds.push(card.id);

        //Check if both cards are  matched
        if(obj1.gameValues[0]==obj1.gameValues[1]){
          obj1.score++;
          document.getElementById("scoreDiv").innerHTML="Score: "+obj1.score;
          obj1.cardsFlipped+=2;

          //Remove all the cards fromt he Array
          obj1.gameValues=[];
          obj1.gameTitleIds=[];

          //Check if all the cards matched
          if(obj1.cardsFlipped==obj1.gameArray.length){
            alert("You Won!\n Starting a new game!");
            location.reload();
          }

        }else{//cards not matched
          setTimeout(function() { this.flipBackOver(obj1.gameTitleIds); }.bind(this), 1000);
        }
      }
    }//No else
  }//memoryFLipCard() ends

  flipBackOver(objId){
    var card1=document.getElementById(objId[0]);
    var card2=document.getElementById(objId[1]);
    card1.style.background='no-repeat';
    card1.innerHTML="";
    card2.style.background='no-repeat';
    card2.innerHTML="";

    //clear Game Arrays
    this.obj.gameValues=[];
    this.obj.gameTitleIds=[];
  }

  drawCards(){
    for(let i=0;i<this.obj.gameArray.length;i++){
      this.ids="card_"+i+"";
      var op1=<div key={i} id={this.ids} onClick={()=>this.memoryFlipCard("card_"+i+"",this.obj.gameArray[i],this.obj)}></div>;
      this.obj.op.push(op1);
    }
    return this.obj.op;
  }

  render(){
    const output=this.drawCards();
    return (
      <div id="memoryBoard">
      {output}
      </div>
    );
  }//render ends


}

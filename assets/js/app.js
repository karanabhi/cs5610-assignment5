// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

function form_init(){
  //alert("hello11");
 let channel=socket.channel("games:memory",{});
  channel.join()
  .receive("ok",resp=>{console.log("Joined Successfully",resp)})
  .receive("error",resp=>{console.log("Undable to Join",resp)});

  $("#game-button").click(()=>{
    let gameName=$("#_gameName").val();
    channel.push("gName",{gameName:gameName})
    .receive("ok",msg=>{
      $("#game-output").text(msg.message);
    });
  });
}//form_init() ends

import render_game from "./game"

function init() {
  if(document.getElementById('boardMainDiv')){
    render_game();
  }
  if(document.getElementById('_gameName')){
    form_init();
  }
}

// Use jQuery to delay until page loaded.
$(init);

import React from "react";
import {render} from "react-dom";
import {Board} from "./Board"
import {Score} from "./Score"
import {Click} from "./Click"
import {Reset} from "./Reset"

export function render_game(){
  render(<Score/>,window.document.getElementById("scoreMainDiv"));
  render(<Click/>,window.document.getElementById("clickMainDiv"));
  render(<Reset/>,window.document.getElementById("resetBtnMainPara"));
  render(<Board/>,window.document.getElementById("boardMainDiv"));
}

import React from "react";
import ReactDOM from "react-dom";
import {Button} from "reactstrap";
import socket from "./socket";

export default function start_game(root, game_name) {
    ReactDOM.render(<GameBoard gameName={game_name}/>, root);
}

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            visibility: [],
            clickCount: 0,
            gamestatus: 0,
        };
        this.channel = null;
        this.ongoingRequest = false;
    }

    componentDidMount() {
        let channel = socket.channel("game:" + this.props.gameName, {});
        this.channel = channel;
        channel.join()
            .receive("ok", resp => {
                console.log("Joined successfully", resp);
                this.setupChannelMessageHandling();
                this.updateStateFromResponse(resp);
            })
            .receive("error", resp => {
                console.log("Unable to join", resp);
            });

    }

    setupChannelMessageHandling() {
        // update state from response
        this.channel.on("game:update", (resp) => {
            this.ongoingRequest = false;
            this.updateStateFromResponse(resp)
        });

        this.channel.on("game:intermediate", (resp) =>
            this.updateStateFromResponse(resp)
        );
    }

    updateStateFromResponse(resp) {
        this.setState({
            values: resp.state.values,
            visibility: resp.state.visibility,
            clickCount: resp.state.click_count,
            gamestatus: resp.state.gamestatus
        })
    }

    drawCell(i) {
        return <Cell alphabet={this.state.values[i]}
                       visibility={this.state.visibility[i]}
                       clickHandler={() => this.handleClick(i)}/>
    }

    handleClick(i) {
        if (this.ongoingRequest == false) {
            this.channel.push("game:move", {game_index: i});
            this.ongoingRequest = true;
        }
    }

    gameStatus() {
        if (this.state.gamestatus == 1) {
            //ongoing game
            //return 'In Progress' + this.props.gameName;
            return '';
        } else if (this.state.gamestatus == 2) {
            return this.props.gameName + ' - Completed.';
        } else if (this.state.gamestatus == 0) {
            // game over
            //return 'Something happened! Please try again!';
            return '';
        } else {
            return ' Current Game status -' + this.state.gamestatus + '.' + this.props.gameName;
        }
    }

    renderGameBoard() {
        if (this.state.gamestatus == 1 || this.state.gamestatus == 2) {
            return  (<div id="memoryBoard">
                        {this.drawCell(0)}
                        {this.drawCell(1)}
                        {this.drawCell(2)}
                        {this.drawCell(3)}

                        {this.drawCell(4)}
                        {this.drawCell(5)}
                        {this.drawCell(6)}
                        {this.drawCell(7)}

                        {this.drawCell(8)}
                        {this.drawCell(9)}
                        {this.drawCell(10)}
                        {this.drawCell(11)}

                        {this.drawCell(12)}
                        {this.drawCell(13)}
                        {this.drawCell(14)}
                        {this.drawCell(15)}
                  </div>);
        } else {
            return <div className="game-board"></div>;
        }
    }


    /*
    Render function to display the game board on the we page.
     */
    render() {
        const currGameStatus = this.gameStatus();
        return (
            <div>
                <div className="game">
                    {this.renderGameBoard()}
                </div>
                <div className="text-center">
                    {currGameStatus}
                </div>
                <div>
                    <p>Clicks Count: {this.state.clickCount}</p>
                    <button className="btn btn-danger" id="reset"
                            onClick={() => this.channel.push("game:reset", {})}>Reset Board
                    </button>
                </div>
            </div>

        )
    }
}

class Cell extends React.Component {
    render() {
        return (
            <div onClick={this.props.clickHandler} disabled={this.props.visibility == -1}>
                {this.props.visibility == 0 ? "" : this.props.alphabet}
            </div>);
            }
          }

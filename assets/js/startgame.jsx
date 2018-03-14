import React from "react";
import ReactDOM from "react-dom";

export default function game_form(root) {
    ReactDOM.render(<GameStartForm/>, root);
}

class GameStartForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userInput: '', showWarning: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /* handle input change event*/
    handleChange(event) {
        this.setState({showWarning: false});
        this.setState({userInput: event.target.value});
    }

    /* handle click event */
    handleClick(event) {
        const gameNameStr = this.state.userInput;
        // validate the input and start if only a valid input
        if (!gameNameStr || /^\s*$/.test(gameNameStr) || gameNameStr.indexOf(' ') >= 0) {
            this.setState({showWarning: true});
        } else {
            window.location.href = '/game/'+ this.state.userInput;
        }
    }
    
    showWarning() {
        let warning = "";
        if (this.state.showWarning == true) {
            warning = <div className="row alert alert-danger" role="alert">
                <strong>Please Enter a valid Game Name</strong>.
            </div>;
        }
        return warning;
    }

    render() {
        return (<div>
            {this.showWarning()}
            <div className="row">
                <div className="col col-lg-5">
                    <p>
                    <input type="text" value={this.state.userInput} onChange={this.handleChange}
                           className="form-control" placeholder="Enter Game Name" aria-label="Game Name"
                           aria-describedby="basic-addon1"/>
                    </p>
                </div>
                </div>
                <div>
                <div className="col col-lg-5">
                  <p>
                    <button className="btn btn-success"
                            onClick={this.handleClick}> Start Game
                    </button>
                  </p>
                </div>
            </div>
            </div>);
    }
}

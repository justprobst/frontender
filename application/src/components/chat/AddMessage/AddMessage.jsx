import React from 'react';
import './AddMessage.css';

class AddMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    onSubmitMessage() {
        if (!this.state.input.length) return;

        this.props.onSubmit(this.state.input, 'Me');
        this.props.sendMessageToSocket(this.state.input);
        this.setState({input: ''});
    }

    render() {
        return (
            <div className="AddMessage">
                <input
                    className="AddMessage__Input"
                    type="text"
                    placeholder="Type message"
                    value={this.state.input}
                    onChange={
                        (e) => this.setState({input: e.target.value})
                    }
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            this.onSubmitMessage();
                        }
                    }}
                />
                <button
                    className="AddMessage__Button"
                    onClick={() => this.onSubmitMessage()}
                >Send</button>
            </div>
        );
    }
}

export default AddMessage;

import React from 'react';
import './Microchat.css';

class Microchat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    onSubmitMessage = () => {
        if (!this.state.input.length) return;

        window.socket.emit('send microchat msg', this.state.input);
        this.setState({input: ''});
    };

    render() {
        return (
            <div className="Microchat">
                <input
                    className="Microchat__Input"
                    type="text"
                    placeholder="Type message"
                    value={this.state.input}
                    onChange={(e) => this.setState({input: e.target.value})}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            this.onSubmitMessage();
                        }
                    }}
                />
                <button className="Microchat__Button" onClick={this.onSubmitMessage}>Send</button>
            </div>
        );
    }
}

export default Microchat;

import React from 'react';
import './AddMessage.css';

class AddMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    render() {
        return (
            <div className="AddMessage">
                <input
                    className="AddMessage__Input"
                    type="text"
                    placeholder="Message"
                    value={this.state.input}
                    onChange={
                        (e) => this.setState({input: e.target.value})
                    }
                />
                <button
                    className="AddMessage__Button"
                    onClick={
                        () => this.props.onSubmit(this.state.input, 'Me')
                    }
                >Send</button>
            </div>
        );
    }
}

export default AddMessage;

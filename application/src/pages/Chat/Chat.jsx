import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../containers/chat/Sidebar';
import MessagesList from '../../containers/chat/MessagesList';
import AddMessage from '../../containers/chat/AddMessage';
import './Chat.css';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userNameConfirmed: false
        }
    }

    confirmName = () => {
        if (this.state.username.length) {
            this.setState({userNameConfirmed: true});
            window.socket.emit('username', this.state.username);
        }
    };

    onChange = (e) => {
        this.setState({username: e.target.value})
    };

    render() {
        return (
            <div className="Chat">
                <Link className="Chat__Link" to="/">Home</Link>
                <h1 className="Chat__Title">
                    {this.state.userNameConfirmed ? "CHAT" : "WHAT IS YOUR NAME ?"}
                </h1>
                {
                    this.state.userNameConfirmed ?
                        <ChatWindow /> :
                        <NameInput
                            username={this.state.username}
                            onChange={this.onChange}
                            confirmName={this.confirmName}
                        />
                }
            </div>
        );
    }
}

function ChatWindow() {
    return (
        <div className="Chat__Window">
            <Sidebar />
            <div className="MessagesWindow">
                <MessagesList />
                <AddMessage sendMessageToSocket={
                    message => window.socket.emit('chat message', message)
                }/>
            </div>
        </div>
    );
}

function NameInput(props) {
    return (
        <>
            <input
                className="NameInput"
                type="text"
                placeholder="Your name"
                value={props.username}
                onChange={props.onChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        props.confirmName();
                    }
                }}
            />
            <button className="ConfirmNameButton" onClick={props.confirmName}>CONFIRM NAME</button>
        </>
    )
}

export default Chat;

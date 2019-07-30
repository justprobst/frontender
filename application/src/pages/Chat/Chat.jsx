import React from 'react';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
import Sidebar from '../../containers/chat/Sidebar';
import MessagesList from '../../containers/chat/MessagesList';
import AddMessage from '../../containers/chat/AddMessage';

import './Chat.css';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userNameAccepted: false
        }
    }

    setupSocket() {
        this.socket = openSocket('http://localhost:8989');
        this.socket.emit('add user', this.state.username);
        this.socket.on('chat message', (message, user) => console.log(message + ' from ' + user));
        this.socket.on('add user', (username) => console.log(username + ' connected'));
    }

    render() {
        return (
            <div className="Chat">
                <Link className="Chat__Link" to="/">Home</Link>
                <h1 className="Chat__Title">{this.state.userNameAccepted ? "CHAT" : "WHAT IS YOUR NAME ?"}</h1>
                {
                    !this.state.userNameAccepted ?
                    (
                        <input
                            className="NameInput"
                            type="text"
                            placeholder="Your name"
                            value={this.state.username}
                            onChange={(e) => this.setState({username: e.target.value})}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && this.state.username.length) {
                                    this.setState({userNameAccepted: true});
                                    this.setupSocket();
                                }
                            }}
                        />
                    )
                        :
                    (
                        <div className="Chat__Window">
                            <Sidebar />
                            <div className="MessagesWindow">
                                <MessagesList />
                                <AddMessage sendMessageToSocket={message => this.socket.emit('chat message', message, this.state.username)}/>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Chat;

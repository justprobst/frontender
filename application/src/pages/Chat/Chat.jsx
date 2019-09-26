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
            userNameAccepted: false
        }
    }

    render() {
        return (
            <div className="Chat">
                <Link className="Chat__Link" to="/">Home</Link>
                <h1 className="Chat__Title">{this.state.userNameAccepted ? "CHAT" : "WHAT IS YOUR NAME ?"}</h1>
                {
                    !this.state.userNameAccepted ?
                    (
                        <>
                            <input
                                className="NameInput"
                                type="text"
                                placeholder="Your name"
                                value={this.state.username}
                                onChange={(e) => this.setState({username: e.target.value})}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && this.state.username.length) {
                                        this.setState({userNameAccepted: true});
                                        window.socket.emit('username', this.state.username);
                                    }
                                }}
                            />
                            <button
                                className="ConfirmNameButton"
                                onClick={() => {
                                    if (this.state.username.length) {
                                        this.setState({userNameAccepted: true});
                                        window.socket.emit('username', this.state.username);
                                    }
                                }}
                            >CONFIRM NAME</button>
                        </>
                    )
                        :
                    (
                        <div className="Chat__Window">
                            <Sidebar />
                            <div className="MessagesWindow">
                                <MessagesList />
                                <AddMessage sendMessageToSocket={message => window.socket.emit('chat message', message)}/>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Chat;

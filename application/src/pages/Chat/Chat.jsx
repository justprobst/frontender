import React from 'react';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
import Sidebar from '../../containers/chat/Sidebar';
import MessagesList from '../../containers/chat/MessagesList';
import AddMessage from '../../containers/chat/AddMessage';

import './Chat.css';

function Chat() {
    // const socket = openSocket('http://localhost:8989');
    // socket.emit('chat message', 'hello from user');
    //
    // const onMessage = (message) => {
    //     console.log(message);
    // };
    //
    // socket.on('chat message', message => onMessage(message));

    return (
        <div className="Chat">
            <Link className="Chat__Link" to="/">Home</Link>
            <h1 className="Chat__Title">WANNA CHAT ?</h1>
            <div className="Chat__Window">
                <Sidebar />
                <div className="MessagesWindow">
                    <MessagesList />
                    <AddMessage />
                </div>
            </div>
        </div>
    );
}

export default Chat;

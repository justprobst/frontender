import React from 'react';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
import Sidebar from '../../containers/chat/Sidebar';
import MessagesList from '../../containers/chat/MessagesList';
import AddMessage from '../../containers/chat/AddMessage';

import './Chat.css';

function Chat() {
    const socket = openSocket('http://localhost:8989');

    socket.on('chat message', (message, user) => console.log(message + ' from ' + user));

    const name = 'User' + Math.floor(Math.random() * 100);

    return (
        <div className="Chat">
            <Link className="Chat__Link" to="/">Home</Link>
            <h1 className="Chat__Title">WANNA CHAT ?</h1>
            <div className="Chat__Window">
                <Sidebar />
                <div className="MessagesWindow">
                    <MessagesList />
                    <AddMessage sendMessageToSocket={message => socket.emit('chat message', message, name)}/>
                </div>
            </div>
        </div>
    );
}

export default Chat;

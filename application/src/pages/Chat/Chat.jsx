import React from 'react';
import { Link } from 'react-router-dom';
import './Chat.css';

import Sidebar from '../../components/chat/Sidebar/Sidebar';
import MessagesList from '../../components/chat/MessagesList/MessagesList';
import AddMessage from '../../components/chat/AddMessage/AddMessage';

function Chat() {
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

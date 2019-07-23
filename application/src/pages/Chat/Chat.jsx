import React from 'react';
import { Link } from 'react-router-dom';
import './Chat.css';

function Chat() {
    return (
        <div className="Chat">
            <Link className="Chat__Link" to="/">Home</Link>
            <h1 className="Title">WANNA CHAT ?</h1>
        </div>
    );
}

export default Chat;

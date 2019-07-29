import React from 'react';
import Message from '../Message/Message'
import './MessagesList.css';

function MessagesList() {
    const messages = [
        {
            author: "Roman",
            message: "Hello World"
        },
        {
            author: "Ilya",
            message: "Hi JSX"
        }
    ];

    return (
        <div className="MessagesList">
            {
                messages.map((message, index) => (
                    <Message key={index} author={message.author} message={message.message} />
                ))
            }
        </div>
    );
}

export default MessagesList;

import React from 'react';
import Message from '../Message/Message'
import './MessagesList.css';

function MessagesList(props) {
    return (
        <div className="MessagesList">
            {
                props.messages && props.messages.map((message, index) => (
                    <Message key={index} {...message} />
                ))
            }
        </div>
    );
}

export default MessagesList;

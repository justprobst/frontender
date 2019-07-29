import React from 'react';
import './Message.css';

function Message(props) {
    return (
        <div className="Message">
            <div className="Message__Author">{props.author}</div>
            <div className="Message__Text">{props.message}</div>
        </div>
    );
}

export default Message;

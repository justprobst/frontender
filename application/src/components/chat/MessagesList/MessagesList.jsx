import React from 'react';
import Message from '../Message/Message'
import './MessagesList.css';

class MessagesList extends React.Component {
    componentDidUpdate() {
        const messagesList = this.refs.messagesList;
        messagesList.scrollTop = messagesList.scrollHeight;
    }

    render() {
        return (
            <div ref="messagesList" className="MessagesList">
                {
                    this.props.messages && this.props.messages.map((message, index) => (
                        <Message key={index} {...message} />
                    ))
                }
            </div>
        );
    }
}

export default MessagesList;

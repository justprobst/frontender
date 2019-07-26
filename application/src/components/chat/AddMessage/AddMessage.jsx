import React from 'react';
import './AddMessage.css';

function AddMessage() {
    return (
        <div className="AddMessage">
            <input className="AddMessage__Input" type="text" />
            <button className="AddMessage__Button">Send</button>
        </div>
    );
}

export default AddMessage;

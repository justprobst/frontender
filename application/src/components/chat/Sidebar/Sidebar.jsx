import React from 'react';
import './Sidebar.css';

function Sidebar(props) {
    return (
        <div className="Sidebar">
            {
                props.users && props.users.map((user, index) => (
                    <div key={index} className="UserName">{user.username}</div>
                ))
            }
        </div>
    );
}

export default Sidebar;

import React from 'react';
import './Sidebar.css';

function Sidebar() {
    const users = [
        {
            name: "Roman"
        },
        {
            name: "Ilya"
        }
    ];

    return (
        <div className="Sidebar">
            {
                users.map((user, index) => (
                    <div key={index} className="UserName">{user.name}</div>
                ))
            }
        </div>
    );
}

export default Sidebar;

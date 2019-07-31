import React from 'react';
import { Link } from 'react-router-dom';
import react_logo from '../../logo.svg';
import router_logo from '../../react-router.svg';
import redux_logo from '../../redux.svg';
import socket_logo from '../../socket-io.svg';
import nodejs_logo from '../../nodejs.svg';
import express_logo from '../../express.png';
import './Home.css'

import Canvas from '../../components/home/Canvas/Canvas';

function Home() {
    return (
        <div className="Home">
            <Link className="Home__Link" to="/chat">Chat</Link>
            <img src={react_logo} className="Logo Logo_spin ReactLogo" alt="react logo" />
            <img src={router_logo} className="Logo RouterLogo" alt="router logo" />
            <img src={redux_logo} className="Logo ReduxLogo" alt="redux logo" />
            <img src={socket_logo} className="SocketLogo" alt="socket logo" />
            <img src={nodejs_logo} className="Logo NodeJsLogo" alt="nodejs logo" />
            <img src={express_logo} className="Logo ExpressLogo" alt="express logo" />
            <Canvas/>
        </div>
    );
}

export default Home;

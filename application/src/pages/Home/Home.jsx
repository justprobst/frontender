import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import router_logo from '../../react-router.svg';
import './Home.css'

import Canvas from '../../components/Canvas/Canvas';

function Home() {
    return (
        <div className="Home">
            <Link className="Home__Link" to="/chat">Chat</Link>
            <img src={router_logo} className="RouterLogo" alt="router logo" />
            <header className="Home__Header">
                <img src={logo} className="Logo" alt="logo" />
            </header>
            <Canvas/>
        </div>
    );
}

export default Home;

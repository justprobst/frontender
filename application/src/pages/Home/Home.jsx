import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import './Home.css'

import Canvas from '../../components/Canvas/Canvas';

function Home() {
    return (
        <div className="Home">
            <Link className="Home__Link" to="/chat">Chat</Link>
            <header className="Home__Header">
                <img src={logo} className="Logo" alt="logo" />
            </header>
            <Canvas/>
        </div>
    );
}

export default Home;

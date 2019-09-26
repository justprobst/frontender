import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import react_logo from '../../logo.svg';
import router_logo from '../../react-router.svg';
import redux_logo from '../../redux.svg';
import socket_logo from '../../socket-io.svg';
import nodejs_logo from '../../nodejs.svg';
import express_logo from '../../express.png';
import './Home.css'

import Microchat from '../../components/home/Microchat/Microchat';
import Canvas from '../../components/home/Canvas/Canvas';

const mapStateToProps = state => ({users: state.users});
const CanvasContainer = connect(mapStateToProps, {})(Canvas);

function Home() {
    const time = new Date().getHours();

    return (
        <div className="Home">
            <Link className="Home__Link" to="/chat">Chat</Link>
            <img src={react_logo} className="Logo Logo_spin ReactLogo" alt="react logo" />
            <img src={router_logo} className="Logo RouterLogo" alt="router logo" />
            <img src={redux_logo} className="Logo ReduxLogo" alt="redux logo" />
            <div className="SocketClock">
                <span className="SocketClock__24">24</span>
                <span className="SocketClock__15">15</span>
                <span className="SocketClock__18">18</span>
                <span className="SocketClock__21">21</span>
                <img src={socket_logo} className="SocketLogo" alt="socket logo" style={{transform: `translateX(-50%) rotate(${time * 360 / 12 - 33}deg)`}} />
            </div>
            <img src={nodejs_logo} className="Logo NodeJsLogo" alt="nodejs logo" />
            <img src={express_logo} className="Logo ExpressLogo" alt="express logo" />
            <CanvasContainer/>
            <Microchat/>
        </div>
    );
}

export default Home;

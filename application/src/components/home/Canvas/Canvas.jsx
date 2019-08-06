import React from 'react';
import './Canvas.css';
import Square from '../Square/Square';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.square = new Square(50, window.innerHeight - 100, 50, 50);
        this.time = new Date().getHours();
        this.stars = [];
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext('2d');

        this.square.canvas = this.canvas;
        this.square.ctx = this.ctx;

        for (let i = 0; i < 100; i++) {
            this.stars.push({x: Math.random() * this.canvas.width, y: Math.random() * (this.canvas.height - 50 - 100) + 100});
        }

        this.renderCanvas();
    }

    componentWillUnmount() {
        this.square.remove();
    }

    drawStars(alpha) {
        this.stars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.arc(star.x, star.y, Math.random() * 0.5 + 0.5, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }

    drawSun(alpha) {
        this.ctx.beginPath();
        const gradient = this.ctx.createLinearGradient(this.canvas.width, 0, 0, this.canvas.height);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.5 * alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.1 * alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height - 50);
    }

    renderCanvas() {
        let sinTime = 0.5 + 0.5 * Math.sin(this.time * Math.PI / 12 - Math.PI * 2 / 3);
        this.ctx.fillStyle = `rgb(${130 * sinTime}, ${210 * sinTime}, ${255 * sinTime})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height - 50);

        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, 50);

        if (sinTime < 0.5) {
            this.drawStars(1 - sinTime * 2);
        }

        this.drawSun(sinTime);

        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height - 50);
        this.ctx.lineTo(this.canvas.width, this.canvas.height - 50);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();

        this.square.render();

        requestAnimationFrame(this.renderCanvas.bind(this));
    }

    render() {
        return (
            <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight}/>
        );
    }
}

export default Canvas;

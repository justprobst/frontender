import React from 'react';
import './Canvas.css';
import Square from '../Square/Square';
import cloud from '../../../cloud.png'

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.square = new Square(50, window.innerHeight - 100, 50, 50);
        this.time = new Date().getHours();
    }

    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=908f63483a48a754f71cc6dc4ef45443');
        xhr.onreadystatechange  = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response  = JSON.parse(xhr.response);
                this.wind = response.wind;

                if (response.weather) {
                    if (response.weather.some(weather_option => weather_option.main === 'Rain')) {
                        this.addRain(100);
                    }

                    if (response.weather.some(weather_option => weather_option.main === 'Clouds')) {
                        this.cloud = new Image();
                        this.cloud.src = cloud;
                    }

                    if (response.weather.some(weather_option => weather_option.main === 'Mist')) {
                        this.mist = true;
                    }
                }
            }
        };
        xhr.send();
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext('2d');

        this.square.canvas = this.canvas;
        this.square.ctx = this.ctx;

        window.addEventListener('resize', this.resize);

        this.addStars(100);

        this.renderCanvas();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        this.square.remove();
    }

    resize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };

    addStars(count) {
        this.stars = [];
        for (let i = 0; i < count; i++) {
            this.stars.push({x: Math.random() * this.canvas.width, y: Math.random() * (this.canvas.height - 50 - 100) + 100});
        }
    }

    drawStars(alpha) {
        this.stars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.arc(star.x, star.y, Math.random() * 0.5 + 0.5, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }

    addRain(count) {
        this.rain = [];
        for (let i = 0; i < count; i++) {
            this.rain.push(new Blob(
                Math.random() * this.canvas.width,
                Math.random() * (this.canvas.height - 50),
                Math.random() * 35 + 15,
                Math.random() * 40 + 10
                )
            );
        }
    }

    drawSun(alpha) {
        this.ctx.beginPath();
        const gradient = this.ctx.createLinearGradient(this.canvas.width, 0, 0, this.canvas.height);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 250, ${0.5 * alpha * alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 245, ${0.1 * alpha * alpha})`);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height - 50);
    }

    renderCanvas() {
        const sin = 0.5 + 0.5 * Math.sin(this.time * Math.PI / 12 - Math.PI * 2 / 3);

        this.ctx.fillStyle = `rgb(${10 * sin}, ${160 * sin}, ${255 * sin})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height - 50);

        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, 50);

        if (sin < 0.5) {
            this.drawStars(1 - sin * 2);
        }

        this.drawSun(sin);

        if (this.mist) {
            this.ctx.fillStyle = `rgba(200, 200, 200, ${0.5 * sin * sin})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height - 50);
        }

        if (this.rain) {
            // draw rainy sky
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height - 50);

            // draw rain
            this.rain.forEach(blob => {
                blob.update();

                if (blob.y >= this.canvas.height - 50) {
                    blob.y = 0;
                }

                this.ctx.beginPath();
                this.ctx.moveTo(blob.x, blob.y);
                this.ctx.lineTo(blob.x, blob.y - blob.blobLength);
                this.ctx.strokeStyle = `rgba(155, 210, 255, ${sin > 0.5 ? 0.8 : 0.8 * sin + 0.4})`;
                this.ctx.stroke();
            });
        }

        if (this.cloud) {
            this.ctx.save();
            this.ctx.globalAlpha = sin * sin;
            this.ctx.drawImage(this.cloud, 0, 150, this.canvas.width, this.canvas.width / 3.6);
            this.ctx.restore();
        }

        this.square.render();

        requestAnimationFrame(this.renderCanvas.bind(this));
    }

    render() {
        return (
            <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight}/>
        );
    }
}

function Blob(x, y, velocityY, blobLength) {
    this.x = x;
    this.y = y;
    this.velocityY = velocityY;
    this.blobLength = blobLength;
    this.update = function() {
        this.y += this.velocityY;
    };
}

export default Canvas;

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
        xhr.open('GET', 'http://ip-api.com/json');
        xhr.onreadystatechange  = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const city  = JSON.parse(xhr.response).city;

                const weather_xhr = new XMLHttpRequest();
                weather_xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=908f63483a48a754f71cc6dc4ef45443`);
                weather_xhr.onreadystatechange  = () => {
                    if (weather_xhr.readyState === 4 && weather_xhr.status === 200) {
                        const response  = JSON.parse(weather_xhr.response);

                        if (response.wind) {
                            this.wind = response.wind;
                        }

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
                weather_xhr.send();
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
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * (this.canvas.height - 50);
            const velocityX = -(Math.pow(this.wind.speed, 2) / 4);
            const velocityY = Math.random() * 10 + 20;
            this.rain.push(new Blob(x, y, velocityX, velocityY));
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

        // ground
        this.ctx.fillStyle = 'rgb(20, 20, 20)';
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
                    const diff = this.canvas.height * blob.velocityX / blob.velocityY;
                    if (diff >= 0) {
                        blob.x = Math.random() * (this.canvas.width + diff) - diff;
                    } else {
                        blob.x = Math.random() * (this.canvas.width - diff);
                    }
                    blob.y = 0;
                }

                this.ctx.save();
                this.ctx.translate(blob.x, blob.y);
                this.ctx.rotate(blob.angle);
                this.ctx.beginPath();
                this.ctx.moveTo(0, 0);
                this.ctx.lineTo(-blob.blobLength, 0);
                this.ctx.strokeStyle = `rgba(155, 210, 255, ${sin > 0.5 ? 0.8 : 0.8 * sin + 0.4})`;
                this.ctx.stroke();
                this.ctx.restore();
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

function Blob(x, y, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.blobLength = Math.sqrt(Math.pow(this.velocityX, 2) + Math.pow(this.velocityY, 2));
    this.angle = Math.atan2(this.velocityY, this.velocityX);
}

Blob.prototype.update = function() {
    this.x += this.velocityX;
    this.y += this.velocityY;
};

export default Canvas;

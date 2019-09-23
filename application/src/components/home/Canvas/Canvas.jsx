import React from 'react';
import Square from '../Square/Square';
import Drop from '../Drop/Drop';
import './Canvas.css';
import cloud from '../../../cloud.png';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.square = new Square(100, window.innerHeight - 200, 50, 50);
        this.time = new Date().getHours();
        this.messages = [];
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext('2d');

        this.square.canvas = this.canvas;
        this.square.ctx = this.ctx;

        window.addEventListener('resize', this.resize);

        window.socket.on('microchat msg', this.addMessage);

        if (sessionStorage.getItem('weather') && (new Date().getTime() - JSON.parse(sessionStorage.getItem('weather')).creation_time < 600000)) {
            const response = JSON.parse(sessionStorage.getItem('weather'));
            this.processResponse(response);
        } else {
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
                            response.creation_time = new Date().getTime();

                            sessionStorage.setItem('weather', JSON.stringify(response));

                            this.processResponse(response);
                        }
                    };
                    weather_xhr.send();
                }
            };
            xhr.send();
        }

        this.addStars(100);

        this.renderCanvas();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        window.socket.off('microchat msg', this.drawMessage);
        cancelAnimationFrame(this.animation);
        this.square.remove();
    }

    addMessage = ({userId, coordinates, message}) => {
        this.messages.push({coordinates, message, ttl: 200});
    };

    processResponse(response) {
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

    resize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 50;
    };

    addStars(count) {
        this.stars = [];
        for (let i = 0; i < count; i++) {
            this.stars.push({x: Math.random() * this.canvas.width, y: Math.random() * (this.canvas.height - 100) + 100}); // высота за исключением верхней кнопки
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
        this.drops = [];
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const velocityX = -(Math.pow(this.wind.speed, 2) / 4);
            const velocityY = Math.random() * 10 + 20;
            this.drops.push(new Drop(this.canvas, this.ctx, x, y, velocityX, velocityY));
        }
    }

    drawSun(alpha) {
        this.ctx.beginPath();
        const gradient = this.ctx.createLinearGradient(this.canvas.width, 0, 0, this.canvas.height);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 250, ${0.5 * alpha * alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 245, ${0.1 * alpha * alpha})`);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMist(alpha) {
        this.ctx.beginPath();
        const gradient = this.ctx.createLinearGradient(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height);
        gradient.addColorStop(0, `rgba(200, 200, 200, ${alpha * alpha})`);
        gradient.addColorStop(0.5, `rgba(200, 200, 200, ${0.75 * alpha * alpha})`);
        gradient.addColorStop(1, `rgba(200, 200, 200, ${0.5 * alpha * alpha})`);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderCanvas() {
        const sin = 0.5 + 0.5 * Math.sin(this.time * Math.PI / 12 - Math.PI * 2 / 3);

        this.ctx.fillStyle = `rgb(${10 * sin}, ${160 * sin}, ${255 * sin})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (sin < 0.5) {
            this.drawStars(1 - sin * 2);
        }

        this.drawSun(sin);

        if (this.mist) {
            this.drawMist(sin);
        }

        if (this.drops) {
            // draw rainy sky
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // draw rain
            this.drops.forEach(drop => {
                drop.update(sin);
            });
        }

        if (this.cloud) {
            this.ctx.save();
            this.ctx.globalAlpha = sin * sin;
            this.ctx.drawImage(this.cloud, 0, 150, this.canvas.width, this.canvas.width / 3.6);
            this.ctx.restore();
        }

        this.square.render({rain: !!this.drops});

        this.props.users.forEach(user => {
            if (!user.self && user.coordinates) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(user.coordinates.x, this.canvas.height - user.coordinates.y, 50, 50);
            }
        });

        this.messages.forEach((message, index) => {
            if (message.ttl) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${message.ttl / 200})`;
                this.ctx.fillRect(message.coordinates.x, this.canvas.height - message.coordinates.y, message.message.length * 18 + 20, 50);
                this.ctx.fillStyle = `rgba(0, 0, 0, ${message.ttl / 200})`;
                this.ctx.font = "40px serif";
                this.ctx.fillText(message.message, message.coordinates.x + 10, this.canvas.height - message.coordinates.y + 40);
                message.coordinates.y += 2;
                message.ttl -= 1;
            } else {
                this.messages.splice(index, 1);
            }
        });

        this.animation = requestAnimationFrame(this.renderCanvas.bind(this));
    }

    render() {
        return (
            <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight - 50}/>
        );
    }
}

export default Canvas;

import React from 'react';
import './Canvas.css';
import Square from '../Square/Square';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.square = new Square(50, window.innerHeight - 100, 50, 50);
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext('2d');

        this.square.canvas = this.canvas;
        this.square.ctx = this.ctx;

        this.renderCanvas();
    }

    componentWillUnmount() {
        this.square.remove();
    }

    renderCanvas() {
        this.ctx.fillStyle = 'rgb(20, 20, 20)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

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

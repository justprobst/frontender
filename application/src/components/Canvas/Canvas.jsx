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
        this.square.componentDidMount();

        this.updateCanvas();
    }

    updateCanvas() {
        this.ctx.fillStyle = 'rgba(10, 10, 20, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.square.drawSquare();

        requestAnimationFrame(this.updateCanvas.bind(this));
    }

    render() {
        return (
            <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight}/>
        );
    }
}

export default Canvas;

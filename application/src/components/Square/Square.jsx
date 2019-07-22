import React from 'react';

function Square(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed || 5;
    this.velocityX = 0;
    this.velocityY = 0;
    this.rightPressed = false;
    this.leftPressed = false;
    this.jump = false;

    const friction = 0.9;
    const gravity = 0.5;

    this.componentDidMount = () => {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 39) {
                this.rightPressed = true;
            }
            if (e.keyCode === 37) {
                this.leftPressed = true;
            }
            if (e.keyCode === 38 || e.keyCode === 32) {
                if (this.jump) return;
                this.jump = true;
                this.velocityY = -this.speed * 2;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 39) {
                this.rightPressed = false;
            }
            if (e.keyCode === 37) {
                this.leftPressed = false;
            }
        });
    };

    this.drawSquare = () => {
        if (this.rightPressed) {
            if (this.velocityX < this.speed) {
                this.velocityX++;
            }
        } else if (this.leftPressed) {
            if (this.velocityX > -this.speed) {
                this.velocityX--;
            }
        } else {
            this.velocityX *= friction;
        }

        if (this.jump) {
            this.velocityY += gravity;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x >= this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width;
        } else if (this.x <= 0) {
            this.x = 0;
        }

        if(this.y >= this.canvas.height - this.height - 50) {
            this.y = this.canvas.height - this.height - 50; // todo вынести в переменную floor или как-то так
            this.jump = false;
        }


        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height - 50);
        this.ctx.lineTo(this.canvas.width, this.canvas.height - 50);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
    }
}

export default Square;

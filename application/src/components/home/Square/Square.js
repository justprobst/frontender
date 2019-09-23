function Square(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 10;
    this.velocityX = 0;
    this.velocityY = 0;
    this.upPressed = false;
    this.rightPressed = false;
    this.leftPressed = false;
    this.jump = false;

    const FRICTION = 0.9;
    const GRAVITY = 0.7;

    const keyDownHandler = (e) => {
        if (e.keyCode === 39) {
            this.rightPressed = true;
        }
        if (e.keyCode === 37) {
            this.leftPressed = true;
        }
        if (e.keyCode === 38 || e.keyCode === 32) {
            this.upPressed = true;
        }
    };

    const keyUpHandler = (e) => {
        if (e.keyCode === 39) {
            this.rightPressed = false;
        }
        if (e.keyCode === 37) {
            this.leftPressed = false;
        }
        if (e.keyCode === 38 || e.keyCode === 32) {
            this.upPressed = false;
        }
    };

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    this.remove = () => {
        document.removeEventListener('keydown', keyDownHandler);
        document.removeEventListener('keyup', keyUpHandler);
    };

    const updateVelocity = () => {
        if (this.rightPressed) {
            if (this.velocityX < this.speed) {
                this.velocityX++;
            }
        } else if (this.leftPressed) {
            if (this.velocityX > -this.speed) {
                this.velocityX--;
            }
        } else {
            this.velocityX *= FRICTION; // todo посмотреть как избавиться от пустых пересчетов
        }

        if (this.upPressed && !this.jump) {
            this.jump = true;
            this.velocityY = -this.speed * 1.5;
        } else {
            this.velocityY += GRAVITY; // todo посмотреть как избавиться от пустых пересчетов
        }
    };

    const updateCoordinates = () => {
        this.x += this.velocityX;
        this.y += this.velocityY;
    };

    const checkCollisionDetection = () => {
        if (this.x >= this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width;
        } else if (this.x <= 0) {
            this.x = 0;
        }

        if (this.y >= this.canvas.height - this.height) {
            this.y = this.canvas.height - this.height;
            this.jump = false;
        }
    };

    const drawSquare = ({ rain }) => {
        // body
        if (rain) {
            this.ctx.fillStyle = '#ffe600';
        } else {
            this.ctx.fillStyle = '#ffffff';
        }
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // umbrella
        if (rain) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y + this.height / 2);
            this.ctx.lineTo(this.x - 7, this.y + this.height / 2);
            this.ctx.strokeStyle = '#ffe600';
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(this.x - 7, this.y + this.height / 2);
            this.ctx.lineTo(this.x - 7, this.y - 10);
            this.ctx.strokeStyle = '#111111';
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.ellipse(this.x - 7, this.y - 10, 65, 30, 0, Math.PI, 0);
            this.ctx.fillStyle = '#222222';
            this.ctx.fill();
        }
    };

    this.render = (data) => {
        updateVelocity();
        updateCoordinates();
        checkCollisionDetection();
        drawSquare(data);

        if (this.velocityX || this.velocityY) {
            window.socket.emit('user move', {x: this.x, y: this.canvas.height - this.y}); // расстояние от нижней части экрана
        }
    }
}

export default Square;

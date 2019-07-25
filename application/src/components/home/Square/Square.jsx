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
            this.velocityX *= FRICTION;
        }

        if (this.upPressed && !this.jump) {
            this.jump = true;
            this.velocityY = -this.speed * 1.5;
        } else {
            this.velocityY += GRAVITY;
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

        if (this.y >= this.canvas.height - this.height - 50) {
            this.y = this.canvas.height - this.height - 50; // todo вынести в переменную floor или как-то так
            this.jump = false;
        }
    };

    const drawSquare = () => {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.render = () => {
        updateVelocity();
        updateCoordinates();
        checkCollisionDetection();
        drawSquare();
    }
}

export default Square;

function Drop(canvas, ctx, x, y, velocityX, velocityY) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.dropLength = Math.sqrt(Math.pow(this.velocityX, 2) + Math.pow(this.velocityY, 2));
    this.angle = Math.atan2(this.velocityY, this.velocityX);
    this.opacity = 0.8;
    this.splatters = [];
}

Drop.prototype.update = function(sin) {
    this.draw(sin);

    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.y > this.canvas.height) {
        this.shatter(sin);

        const diff = this.canvas.height * this.velocityX / this.velocityY;
        if (diff >= 0) {
            this.x = Math.random() * (this.canvas.width + diff) - diff;
        } else {
            this.x = Math.random() * (this.canvas.width - diff);
        }
        this.y = 0;
    }

    this.splatters.forEach((splatter, index) => {
        splatter.update();
        if (splatter.ttl === 0) {
            this.splatters.splice(index, 1)
        }
    });
};

Drop.prototype.draw = function(sin) {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-this.dropLength, 0);
    this.ctx.strokeStyle = `rgba(155, 210, 255, ${sin > 0.5 ? this.opacity : this.opacity * sin + this.opacity / 2})`;
    this.ctx.stroke();
    this.ctx.restore();
};

Drop.prototype.shatter = function(sin) {
    for (let i = 0; i < 5; i++) {
        this.splatters.push(new Splatter(this.canvas, this.ctx, this.x, this.canvas.height, this.opacity, sin));
    }
};

function Splatter(canvas, ctx, x, y, opacity, sin) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.sin = sin;
    this.x = x;
    this.y = y;
    this.velocityX = Math.random() * 10 - 5;
    this.velocityY = Math.random() * (-5);
    this.gravity = 0.8;
    this.radius = 0.5;
    this.ttl = 10;
    this.opacity = opacity;
}

Splatter.prototype.update = function() {
    this.draw();

    if (this.y + this.velocityY + this.radius > this.canvas.height) {
        this.ttl = 1;
    } else {
        this.velocityY += this.gravity;
    }

    this.x += this.velocityX;
    this.y += this.velocityY;
    this.ttl -= 1;
    this.opacity -= 1 / this.ttl;
};

Splatter.prototype.draw = function() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y - this.radius, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(155, 210, 255, ${this.sin > 0.5 ? this.opacity : this.opacity * this.sin + this.opacity / 2})`;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
};

export default Drop;

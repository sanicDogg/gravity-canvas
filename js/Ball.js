import { params } from "./params.js"

let { floor_h, floor_y, canvas_w, gravity, friction } = params;

export class Ball {

    constructor(x, y, dx, dy, r, fill, context) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.fill = fill;
        this.context = context;
    }

    update() {
        gravity = params.gravity;
        friction = params.friction;

        if (this.y + this.r + this.dy > floor_y - floor_h / 2 - 2) {
            this.dx *= friction;
            this.dy *= friction;
            this.dy = -this.dy;
        } else
            this.dy += gravity;

        if (this.x + this.r + this.dx > canvas_w
            || this.x - this.r + this.dx < 0) {
            this.dx *= friction;
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    draw() {
        const c = this.context;

        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        c.fillStyle = this.fill;
        // c.fillRect(this.x, this.y, this.r, this.r);
        c.fill();
        c.lineWidth = 5;
        // c.strokeRect(this.x, this.y, this.r, this.r)
        c.stroke();
    }
}
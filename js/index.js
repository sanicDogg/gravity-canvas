import {init, updateParamsHtml} from './init.js';
import {Ball} from "./Ball.js";
import {params, scale} from "./params.js";

let {canvas_w, canvas_h, bg_color, floor_y, floor_h, palette} = params;
let {canvas, context} = init(canvas_w, canvas_h);

let balls = makeBalls();

canvas.addEventListener("click", () => {
    balls = makeBalls();
});

document.body.addEventListener("keydown", (e) => {
    if (e.key === " ")
        balls = makeBalls();
});

loop();
updateParamsHtml();

function loop() {
    window.requestAnimationFrame(loop);
    clear();

    balls.forEach(ball => {
        ball.update(balls);
    });
}

function makeBalls() {
    const count = 150;
    let balls = [];
    for (let i = 0; i < count; i++) {
        let radius = (getRandInt(5, 20) * scale);
        let x = getRandInt(radius + 10, canvas_w - radius - 10);
        let y = getRandInt(0, floor_y - 100 - radius);
        let dx = getRandInt(-3, 3);
        let dy = getRandInt(-2, 2);
        let fill = getRandomColor(palette);

        balls.push(new Ball(x, y, dx, dy, radius,fill, context, i+1))
    }
    return balls;
}

function getRandInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor(PALETTE) {
    return "#" + PALETTE[getRandInt(0, PALETTE.length)];
}

function clear() {
    context.save();
    context.fillStyle = bg_color;
    context.fillRect(0, 0, canvas_w, canvas_h);
    context.beginPath();
    context.lineWidth = floor_h;
    context.moveTo(0, floor_y);
    context.lineTo(canvas_w, floor_y);
    context.stroke();
    context.restore();
}

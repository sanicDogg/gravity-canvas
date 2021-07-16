import { params } from "./params.js";

export function init(width, height) {
    let c = getCanvas(width, height);
    let ctx = c.getContext('2d');
    let params = getParamsHtml();

    document.body.appendChild(c);
    document.body.appendChild(params);

    return {canvas: c, context: ctx}
}

function getCanvas(w, h) {
    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    return canvas;
}

function getParamsHtml() {
    let d = document.createElement("div");
    d.classList.add("params");
    d.appendChild(document.createElement("ul"));
    return d;
}

export function updateParamsHtml() {
    let ul = document.querySelector(".params ul");
    const gravity = params.gravity;
    const friction = params.friction;
    let gravityText = "Гравитация: " + gravity;
    let frictionText = "Трение: " + friction;
    ul.innerHTML = `<li>${gravityText}</li><li>${frictionText}</li>`;
}

function addGravity() {
    params.newGravity = parseFloat((params.gravity + 0.1).toFixed(1));
    updateParamsHtml();
}

function subGravity() {
    params.newGravity = parseFloat((params.gravity - 0.1).toFixed(1));
    updateParamsHtml();
}

function addFriction() {
    params.newFriction = parseFloat((params.friction + 0.01).toFixed(2));
    updateParamsHtml();
}

function subFriction() {
    params.newFriction = parseFloat((params.friction - 0.01).toFixed(2));
    updateParamsHtml();
}

// Event Listeners
document.body.addEventListener("keydown", (e) => {
    if (e.code === "Minus")
        subGravity();

    if (e.code === "Equal")
        addGravity();

    if (e.code === "BracketLeft")
        subFriction();

    if (e.code === "BracketRight")
        addFriction();
});

document.addEventListener("touchstart", function (e) { TouchStart(e); });
document.addEventListener("touchmove", function (e) { TouchMove(e); });
document.addEventListener("touchend", function (e) { TouchEnd(e, "green"); });
document.addEventListener("touchcancel", function (e) { TouchEnd(e, "red"); });

let touchStart = null, touchPosition = null, sensitivity = 20;

function TouchStart(e)
{
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };
}

function TouchMove(e)
{
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
}

function TouchEnd(e)
{
    CheckAction(e);
    touchStart = null;
    touchPosition = null;
}

function CheckAction()
{
    let d =
        {
            x: touchStart.x - touchPosition.x,
            y: touchStart.y - touchPosition.y
        };

    if(Math.abs(d.x) > Math.abs(d.y)) {
        if (Math.abs(d.x) > sensitivity)
            if (d.x > 0)
                subFriction(); // Swipe Left
            else
                addFriction(); // Swipe Right
    }
    else
        if(Math.abs(d.y) > sensitivity)
            if(d.y > 0)
                addGravity() // Swipe up
            else
                subGravity() // Swipe down
}
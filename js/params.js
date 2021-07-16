export let params = {
    canvas_w: innerWidth,
    canvas_h: innerHeight,
    bg_color: "#94A89A",
    floor_y: innerHeight * 0.95,
    floor_h: innerHeight * 0.1,
    gravity: 0.4,
    friction: 0.98,
    set newGravity (value) {
        this.gravity = value;
    },
    set newFriction (value) {
        this.friction = value;
    },
    palette: ["191923","9c0d38","d9e76c","0e79b2","f39237", "25A18E", "35A7FF"]
}

let getScale = () => {
    let scale = 1;
    if (innerWidth > 300 && innerWidth < 500) scale = 1.5;
    if (innerWidth > 1000) scale = 2;
    if (innerWidth > 1500) scale = 3;
    if (innerWidth > 2000) scale = 4;
    return scale;
}

export let scale = getScale();
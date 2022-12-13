const { last } = require("lodash");

var c = document.getElementById("circle-canvas");
var ctx = c.getContext("2d");


const drawCircle = (circle) => {
    ctx.beginPath();
    ctx.arc(
        circle.x,
        circle.y,
        circle.r,
        0,
        2*Math.PI
    );
    ctx.fillStyle = circle.color;
    ctx.fill();
}

const degToRad = (degrees) => {
    return degrees * Math.PI / 180;
}

const circleColors = [
    "#000000",
    "#B0AB9F",
    "#FFFCF6",
    "#ABE0FF",
    "#FFDF8D",
    "#ECB09B"
];

const drawCircles = (numCircles, angleOffset) => {
    var angle = 90 - angleOffset;
    var angleDelta = 360/numCircles;
    var colorIndex = 0;
    var circle = {};
    circle.r = .03 * c.width;
    var radius = c.width / 2 - circle.r;
    for (var i = 0; i < numCircles; i++) {
        circle.color = circleColors[colorIndex];
        colorIndex++;
        if (colorIndex >= circleColors.length) colorIndex = 0;

        circle.x = c.width / 2 + radius * Math.cos(degToRad(angle));
        circle.y = radius * Math.sin(degToRad(angle));

        drawCircle(circle);

        angle -= angleDelta;
    }
}

var angleOffset = 0;
const angleOffsetDelta = 10;

var lastTimestamp = 0;

const update = (timestamp) => {
    let deltaTime = (timestamp - lastTimestamp)/1000;
    
    ctx.clearRect(0, 0, c.width, c.height);
    c.width = .5 * window.innerWidth;
    if (window.innerWidth < 768) c.width = .7 * window.innerWidth;
    c.height = .5 * c.width;


    drawCircles(24, angleOffset);

    angleOffset += angleOffsetDelta * deltaTime;

    lastTimestamp = timestamp;

    window.requestAnimationFrame(update);
}
  
window.requestAnimationFrame(update);
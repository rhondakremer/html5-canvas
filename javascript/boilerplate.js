// Initial Setup
let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables
let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

let colors = ["red", "yellow", "pink", "green"];

// Event Listeners
addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

// Objects
function Object(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        this.draw()
    }
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath(); 
    }
}

let objects;
// Implementation
function init() {
    objects = [];
    
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "white";
    c.fillText("HTML CANVAS", mouse.x, mouse.y);
}

init();
animate();
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

let colors = ["#C004D9", "#AB05F2", "#5A13F2", "#2745F2", "#1B78F2"];

let gravity = 1;
let friction = 0.95;

let ballAmount = 100;

// Event Listeners
addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    init();
});

addEventListener("click", function() {
    init();
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy *= -1 * friction;
        }
        else {
            this.dy += gravity;
        }
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath(); 
    }
}

// Implementation
let ball;
let ballArray;

function init() {
    ballArray = [];
    for (let i = 0; i < ballAmount; i++) {
        let radius = randomIntFromRange(20, 30)
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(0, canvas.height - radius);
        let dx = randomIntFromRange(-2, 2);
        let dy = randomIntFromRange(-2, 2);
        let color = randomColor(colors);
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height); // refreshes screen on movement- needs to be before for loop
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    } 
}

init();
animate();
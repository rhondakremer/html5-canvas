// Definitions for math dummy
// Radians - measure the openness of an angle
// 1 radian- the angle made when we take the radius and wrap it around the circle
// the outer arc created is the same length are radius
// halfway around circle is PI radians
// full circle is 2*PI radians

// sin and cosine only take radians as args
// sin(x) = input is angle in radians, output is ratio of (opposite side / hypotenuse)
// cos output is ratio of (adjacent side / hypotenuse)

// if we increase angle size over time we will retrieve all values from -1 to 1 and if we add these to the circle's x y coordinates will make oscillation

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

let colors = ["#D8E0BB", "#B6CEC7", "#86A3C3", "#7268A6", "#6B3074"];

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
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2; // creates particles that start in different places along circle circumference
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120); 
    this.lastMouse = {
        x: x,
        y: y
    };

    this.update = function() {
        const lastPoint = {
            x: this.x,
            y: this.y
        }; 
        // Move points over time
        this.radians += this.velocity;
        // Drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        // going between 1 and -1
        // console.log(Math.cos(this.radians))
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;  // x and y need to use same value or else they get wonky
        // these x and y decs on their own create circular motion- comes down to cos, sin, and increasing radians
        this.draw(lastPoint);
    }
    this.draw = function(lastPoint) {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y); // drawing line from last location to new location
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath(); 
    }
}

// Implementation
let particles;

function init() {
    particles = [];

    for (let i = 0; i < 50; i++) {
        const radius = (Math.random() * 4) + 1; 
        particles.push(new Particle(canvas.width/2, canvas.height/2, radius, randomColor(colors)))   
    }
    // console.log(particles)
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.09)'; // create trail effect- draws new black rectangle that with transparency and layers produces fade
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    })
}

init();
animate();

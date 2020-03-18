// select canvas element
let canvas = document.querySelector('canvas');
// set height and width through javascript to ensure it takes up whole screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// context variable- creating a context object
let c = canvas.getContext('2d')

// Animation
// initialize mouse position object
var mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40;
let minRadius = 2;

let colorArray = ["#6BB251", "#40A819", "#45FF00", "#B2009E", "#FF00E2"]

// get mouse position on event listener
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init()
})

// object oriented programming hell yeah
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius; 
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = "orange";
        // c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx *= -1;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy *= -1;
        }
     
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }   
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw()
    }
}


var circleArray = [];

function init() {
    circleArray = [];

    for (let i = 0; i < 800; i++) {
        var radius = Math.floor(Math.random() * 3) + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 8;
        let dy = (Math.random() - 0.5) * 8;
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight); // clear each time or else it just makes a step line

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();
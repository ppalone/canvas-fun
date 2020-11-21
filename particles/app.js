const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let PARTICLES_SIZE = WIDTH < 600 && HEIGHT < 800 ? 50 : 100;
let DISTANCE = WIDTH < 600 && HEIGHT ? 75 : 150;
const particles = [];

const mouse = {
  x: null,
  y: null
}

addEventListener('mousemove', function(e) {
  // console.log(e);
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  // console.log(mouse.x, mouse.y);
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, WIDTH, HEIGHT);

class Particle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
  }
  update() {
    if ((this.x + this.radius) > WIDTH || (this.x - this.radius) < 0) {
      this.dx = -this.dx;
    }

    if ((this.y + this.radius) > HEIGHT || (this.y - this.radius) < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx * 0.5;
    this.y += this.dy * 0.5;

    this.draw();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'transparent';
    ctx.fill();
    ctx.stroke();
  }
}

for(let i = 0; i < PARTICLES_SIZE; i++) {
  particles.push(
    new Particle(
      4 + Math.floor(Math.random() * (WIDTH - 8)),
      4 + Math.floor(Math.random() * (HEIGHT - 8)),
      4,
      Math.random() < 0.5 ? -1 : 1,
      Math.random() < 0.5 ? -1 : 1,
    )
  )
}

function animate() {

  // ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = '#202020';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  for (let i = 0; i < PARTICLES_SIZE; i++) {
    particles[i].update();

    for (let j = 0; j < PARTICLES_SIZE; j++) {
      if (Math.abs(particles[i].x - particles[j].x) <= DISTANCE && Math.abs(particles[i].y - particles[j].y) <= DISTANCE) {
        ctx.beginPath();
        ctx.beginPath
				ctx.strokeStyle = 'rgba(255, 255, 255, 0.20)';
				ctx.moveTo(particles[i].x, particles[i].y);
				ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }

  }

  requestAnimationFrame(animate);
}

animate();

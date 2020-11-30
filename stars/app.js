const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const STARS_SIZE = 50;
const STARS_RADIUS = 5;
const stars = [];

class Star {
  constructor(x, y, dx, dy, radius, acceleration) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.acceleration = acceleration;
  }
  update() {

    this.x += this.dx * this.acceleration;
    this.y += this.dy * this.acceleration;

    if (this.x < 0) {
      this.x = WIDTH;
    }

    if (this.y > HEIGHT) {
      this.y = 0;
    }

    this.draw();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 250, 250, 0.5)';
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
    ctx.stroke();
  }
}

for (let i = 0; i < STARS_SIZE; i++) {
  stars.push(
    new Star(
      Math.floor(Math.random() * WIDTH),
      Math.floor(Math.random() * HEIGHT),
      -1,
      1,
      2 + Math.floor(Math.random() * 3),
      1 + Math.floor(Math.random() * 4),
    )
  )
}

function animate() {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  for (let i = 0; i < STARS_SIZE; i++) {
    stars[i].update();
  }

  requestAnimationFrame(animate);
}

animate();
class Game{
  constructor(){
    this.penguin = new Penguin("penguin");
    this.yeti = document.getElementById("yeti");
    this.score = document.getElementById("score");
    this.falling = false;
    this.intervalId = null;
    this.fallSpeed = 3;
  }
  start(){
    this.penguin.reset();
    this.falling = true;
    this.penguin.y = 20;
    this.penguin.applyStyles();
    this.intervalId = setInterval(() => this.gameLoop(), 16);
  }
  endThrow(distance) {
    clearInterval(this.intervalId);
    if (distance > this.bestDistance) {
      this.bestDistance = distance;
    }
    this.score.textContent = `Дистанція: ${distance} м`;
    this.falling = false;
    this.penguin.isFlying = false;
    setTimeout(() => this.start(), 1000);
  }
  gameLoop() {
    if (this.falling) {
      this.penguin.y += this.fallSpeed;
      this.penguin.applyStyles();
      if (this.penguin.y > 300) {
        this.falling = false;
        this.endThrow(0);
      }
    }
    if (this.penguin.isFlying) {
      this.penguin.update();
      if (Math.abs(this.penguin.vx) < 0.3 && Math.abs(this.penguin.vy) < 0.3 && this.penguin.y >= 369) {
        this.endThrow(this.penguin.getDistance());
      }
    }
  }
  hit() {
    if (!this.falling || this.penguin.isFlying) return;
    this.falling = false;
    this.yeti.style.transform = 'rotate(-35deg) scale(1.1)';
    setTimeout(() => {
      this.yeti.style.transform = 'rotate(0deg) scale(1)';
    }, 180);
    const heightDiff = 280 - this.penguin.y;
    let power = 14 + heightDiff * 0.12;
    let angle = 42 + heightDiff * 0.15;
    power = Math.max(9, Math.min(power, 22));
    angle = Math.max(28, Math.min(angle, 58));
    this.penguin.throw(power, angle);
  }
}

class Penguin {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.x = 40;
    this.y = 30;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.isFlying = false;
    this.gravity = 0.35;
    this.bounceFactor = 0.55;
  }
  reset() {
    this.x = 40;
    this.y = 30;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.isFlying = false;
    this.applyStyles();
  }
  throw(power, angleDeg) {
    const angle = angleDeg * Math.PI / 180;
    this.vx = Math.cos(angle) * power;
    this.vy = -Math.sin(angle) * power;
    this.isFlying = true;
  }
  update() {
    if (!this.isFlying) return;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.vx * 2;
    if (this.y > 999) {
      this.y = 999;
      this.vy = -this.vy * this.bounceFactor;
      this.vx *= 0.92;
      if (Math.abs(this.vy) < 1.5) {
        this.vy = 0;
        this.vx *= 0.85;
      }
    }
    this.applyStyles();
  }
  applyStyles() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.transform = `rotate(${this.rotation}deg)`;
  }
  getDistance() {
    return Math.max(0, Math.floor((this.x - 100) / 8));
  }
}

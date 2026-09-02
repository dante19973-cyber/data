const game = new Game();
game.start();
document.addEventListener('click', () => game.hit());
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    game.hit();
  }
});

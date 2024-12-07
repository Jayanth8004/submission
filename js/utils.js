function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}
 


function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector('#gameOverScreen').style.display = 'flex';

  if (player.health === enemy.health) {
    document.querySelector('#gameOverText').innerText = 'Tie!';
  } else if (player.health > enemy.health) {
    document.querySelector('#gameOverText').innerText = 'Player Wins!';
  } else {
    document.querySelector('#gameOverText').innerText = 'Enemy Wins!';
  }
}
let isAnimating = false;

function animate() {
  if (!isAnimating) return;
  window.requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();
}

let timer = 60
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}
document.querySelector('#restartButton').addEventListener('click', () => {
  // Reset player and enemy health
  player.health = 100;
  enemy.health = 100;

  // Reset health bar widths
  document.querySelector('#playerHealth').style.width = '100%';
  document.querySelector('#enemyHealth').style.width = '100%';

  // Reset player and enemy positions
  player.position = { x: 0, y: 0 };
  enemy.position = { x: 400, y: 100 };

  // Reset player and enemy velocities
  player.velocity = { x: 0, y: 0 };
  enemy.velocity = { x: 0, y: 0 };

  // Reset the "dead" status
  player.dead = false;
  enemy.dead = false;

  // Reset animations or sprites if necessary
  player.switchSprite('idle');
  enemy.switchSprite('idle');

  // Reset the timer and UI
  timer = 60;
  document.querySelector('#timer').innerText = timer;
  decreaseTimer();

  // Hide the game-over screen
  document.querySelector('#gameOverScreen').style.display = 'none';

  // Start the animation loop
  isAnimating = true;
  animate();
});


 

 
 

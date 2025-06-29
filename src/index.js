import "./styles.css"
import Player from './modules/Player.js'
import { renderGrid, updateBoardVisuals } from './modules/BoardRenderer.js'
import { enableEnemyBoard } from './modules/BoardEvents.js'

const player = Player("You")
const enemy = Player("Enemy")

const playerBoardEl = document.getElementById('player-board')
const enemyBoardEl = document.getElementById('enemy-board')
const statusEl = document.getElementById('status')
const startBtn = document.getElementById('startGame')

function autoPlaceShips(playerObj, count = 5) {
  let placed = 0
  while (placed < count) {
    if (playerObj.board.place()) placed++
  }
}

function aiAttack() {
  let x, y;

  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (
    player.board.missed[x][y] === -1 ||
    player.board.ships.some(ship =>
      ship.ship.isCoordHit(x, y)
    )
  );

  const wasHit = enemy.attack(player, x, y);

  updateBoardVisuals(player.board, playerBoardEl);

  if (wasHit) {
    statusEl.textContent = "💥 Enemy hit";
  } else {
    statusEl.textContent = "💧 Enemy missed";
  }

  if (player.board.allShipSunked()) {
    statusEl.textContent = "💀 Enemy wins!";
    enemyBoardEl.classList.add('disabled');
    playerBoardEl.classList.add('disabled');
  }
}

startBtn.addEventListener('click', () => {
  autoPlaceShips(player, 5)
  autoPlaceShips(enemy, 5)

  renderGrid(playerBoardEl, player.board, true)
  renderGrid(enemyBoardEl, enemy.board, false)
  updateBoardVisuals(player.board, playerBoardEl)

  enableEnemyBoard(enemy, enemyBoardEl, player, statusEl, null, aiAttack)
  statusEl.textContent = 'Game started! Fire at the enemy board!'
})


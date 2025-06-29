import { updateBoardVisuals } from './BoardRenderer.js'


export function enableEnemyBoard(enemy, boardEl, attacker, statusEl, onWin, onAIAttack) {
  const cells = boardEl.querySelectorAll('.cell')

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const x = parseInt(cell.dataset.x)
      const y = parseInt(cell.dataset.y)

      const hit = attacker.attack(enemy, x, y)
      updateBoardVisuals(enemy.board, boardEl)

      if (hit) {
        statusEl.textContent = '🔥 You hit!'
      } else {
        statusEl.textContent = '💧 You missed!'
      }

      if (enemy.board.allShipSunked()) {
        statusEl.textContent = '🎉 You win!'
        if (onWin) onWin()
        return
      }

      // Trigger AI response
      if (onAIAttack) setTimeout(onAIAttack, 500)
    }, { once: true })
  })
}


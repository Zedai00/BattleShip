export function renderGrid(boardEl, board, showShips = false) {
  boardEl.innerHTML = ''
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.dataset.x = x
      cell.dataset.y = y

      if (showShips && board.board[x][y] === 1) {
        cell.classList.add('ship')
      }

      boardEl.appendChild(cell)
    }
  }
}

export function updateBoardVisuals(board, boardEl) {
  const cells = boardEl.querySelectorAll('.cell')


  cells.forEach(cell => {
    const x = parseInt(cell.dataset.x)
    const y = parseInt(cell.dataset.y)

    const isHit = board.ships.some(ship =>
      ship.ship.isCoordHit(x, y)
    )

    if (board.missed[x][y] === -1) {
      cell.classList.add('miss')
    } else if (isHit) {
      cell.classList.add('hit')
    }

  })
}


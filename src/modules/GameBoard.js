import Ship from "./Ship.js"

const GameBoard = () => {
  let board = Array(10).fill().map(() => Array(10).fill(0))
  let missed = Array(10).fill().map(() => Array(10).fill(0))
  let ships = []

  class Directions {
    static UP = "UP"
    static DOWN = "DOWN"
    static LEFT = "LEFT"
    static RIGHT = "RIGHT"
    static directions = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT]

    static getRandom(exclude) {
      let options = this.directions.filter(d => d !== exclude)
      return options[Math.floor(Math.random() * options.length)]
    }
  }

  function randomNo() {
    return Math.floor(Math.random() * 10)
  }

  function randomLength() {
    return Math.floor(Math.random() * 10) + 1 // 1–10
  }

  function isInBounds(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 10
  }

  function isValid(x, y, length, direction) {
    for (let i = 0; i < length; i++) {
      let { X, Y } = getCoordsByDirection(x, y, direction, i)
      if (!isInBounds(X, Y) || board[X][Y] !== 0) {
        return false
      }
    }
    return true
  }

  function getCoordsByDirection(x, y, dir, i) {
    switch (dir) {
      case Directions.UP: return { X: x, Y: y - i }
      case Directions.DOWN: return { X: x, Y: y + i }
      case Directions.LEFT: return { X: x - i, Y: y }
      case Directions.RIGHT: return { X: x + i, Y: y }
    }
  }

  function getCoords(x, y, length) {
    let attempts = 0
    let coords = []
    let dir = Directions.getRandom()
    while (attempts < 100) {
      if (isValid(x, y, length, dir)) {
        for (let i = 0; i < length; i++) {
          let { X, Y } = getCoordsByDirection(x, y, dir, i)
          coords.push({ x: X, y: Y })
        }
        return coords
      }
      coords = []
      dir = Directions.getRandom(dir)
      attempts++
    }
    return null // if no valid coords found
  }

  function fillBoard(coords) {
    coords.forEach(coord => {
      board[coord.x][coord.y] = 1
    })
  }

  function place(x = randomNo(), y = randomNo(), length = randomLength()) {
    let coords = getCoords(x, y, length)
    if (coords) {
      let ship = Ship(length)
      ships.push({ ship, coords })
      fillBoard(coords)
      return true
    }
    return false
  }

  function receiveAttack(x, y) {
    if (board[x][y] === 1) {
      let shipEntry = ships.find(ship =>
        ship.coords.some(c => c.x === x && c.y === y)
      )

      if (shipEntry) {
        shipEntry.ship.hit(x, y)
        return true
      }
    }

    missed[x][y] = -1
    return false
  }


  function allShipSunked() {
    return ships.every(({ ship }) => ship.isSunk())
  }

  return {
    place,
    receiveAttack,
    board,
    missed,
    allShipSunked,
    ships,
  }
}

export default GameBoard


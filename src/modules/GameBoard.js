import Ship from "./Ship.js"
const GameBoard = () => {
  let board = Array(10).fill().map(() => Array(10).fill(0))
  let missed = [...board]
  let ships = []

  class Directions {
    static UP = "UP"
    static DOWN = "DOWN"
    static LEFT = "LEFT"
    static RIGHT = "RIGHT"
    directions = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT]

    static getRandom() {
      return this.directions[Math.floor(Math.random() * this.directions.length)]
    }
  }

  function place(x, y, length = randomLength()) {
    let ship = Ship(length)
    ships.push({
      ship: ship,
      coords: getCoords(x, y, length)
    })
  }

  function getCoords(x, y, length) {
    let dir = Directions.getRandom()
    let coords = []
    for (let i = 0; i < length; i++) {
      if (dir === Directions.UP) {
        board[x + i][y] = 1
      }
      coords.push([x + i, y].toString())
    }
    return coords
  }

  function randomLength() {
    return Math.floor(Math.random() * 10)
  }

  function receiveAttack(x, y) {
    if (board[x][y] === 1) {
      let index = ships.findIndex(ship => ship.coords.includes([x, y].toString()))
      ships[index].ship.hit()
      return true
    }
    missed[x][y] = -1
    return false
  }

  return { place, receiveAttack, missed }
}

module.exports = GameBoard

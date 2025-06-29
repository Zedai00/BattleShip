import Ship from "../modules/Ship.js"
import GameBoard from "../modules/GameBoard.js"

describe("Ship", () => {
  it("initializes with correct length", () => {
    const ship = Ship(4)
    expect(ship.length).toBe(4)
  })

  it("is not sunk when created", () => {
    const ship = Ship(3)
    expect(ship.isSunk()).toBe(false)
  })

  it("records hits and becomes sunk", () => {
    const ship = Ship(2)
    ship.hit(1, 1)
    expect(ship.isSunk()).toBe(false)
    ship.hit(1, 2)
    expect(ship.isSunk()).toBe(true)
  })

  it("records coordinates of hits", () => {
    const ship = Ship(3)
    ship.hit(0, 0)
    ship.hit(0, 1)

    expect(ship.isCoordHit(0, 0)).toBe(true)
    expect(ship.isCoordHit(0, 1)).toBe(true)
    expect(ship.isCoordHit(1, 1)).toBe(false)
  })

  it("counts hits correctly even if same coord is hit again", () => {
    const ship = Ship(2)
    ship.hit(2, 2)
    ship.hit(2, 2)
    expect(ship.isSunk()).toBe(true) // 2 hits even if same coord
  })
})

describe("GameBoard", () => {
  it("places a ship on the board", () => {
    const board = GameBoard()
    const placed = board.place(0, 0, 3)
    expect(placed).toBe(true)

    const coords = board.ships[0].coords
    coords.forEach(({ x, y }) => {
      expect(board.board[x][y]).toBe(1)
    })
  })

  it("receives a hit and returns true", () => {
    const board = GameBoard()
    board.place(0, 0, 2)
    const { x, y } = board.ships[0].coords[0]
    const result = board.receiveAttack(x, y)
    expect(result).toBe(true)
  })

  it("registers a miss and returns false", () => {
    const board = GameBoard()
    board.place(0, 0, 2)
    const result = board.receiveAttack(9, 9)
    expect(result).toBe(false)
    expect(board.missed[9][9]).toBe(-1)
  })

  it("tracks missed shots correctly", () => {
    const board = GameBoard()
    board.receiveAttack(5, 5)
    expect(board.missed[5][5]).toBe(-1)
  })

  it("sinks a ship after enough hits", () => {
    const board = GameBoard()
    board.place(0, 0, 2)
    board.ships[0].coords.forEach(({ x, y }) => {
      board.receiveAttack(x, y)
    })
    expect(board.ships[0].ship.isSunk()).toBe(true)
  })

  it("detects when all ships are sunk", () => {
    const board = GameBoard()
    board.place(0, 0, 2)
    board.place(3, 3, 2)

    board.ships.forEach(({ coords }) => {
      coords.forEach(({ x, y }) => {
        board.receiveAttack(x, y)
      })
    })

    expect(board.allShipSunked()).toBe(true)
  })

  it("returns false if not all ships are sunk", () => {
    const board = GameBoard()
    board.place(0, 0, 2)
    board.place(3, 3, 2)

    board.ships[0].coords.forEach(({ x, y }) => {
      board.receiveAttack(x, y)
    })

    expect(board.allShipSunked()).toBe(false)
  })

  it("rejects ship placement if overlapping", () => {
    const board = GameBoard()
    const placed1 = board.place(0, 0, 4)
    expect(placed1).toBe(true)

    const placed2 = board.place(0, 0, 4)
    expect(placed2).toBe(false)
  })

})


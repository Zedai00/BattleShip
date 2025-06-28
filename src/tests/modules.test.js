import Ship from "../modules/Ship.js"
import GameBoard from "../modules/GameBoard.js"

it('Ship is Hit and Sunked', () => {
  const ship = Ship(2)
  ship.hit()
  ship.hit()
  expect(ship.isSunk()).toBe(true)
})


it('GameBoard Receive Attack', () => {
  const gameBoard = GameBoard();
  gameBoard.place(0, 0)
  expect(gameBoard.receiveAttack(0, 0)).toBe(true)
})

it('GameBoard Misses Attack', () => {
  const gameBoard = GameBoard();
  gameBoard.place(0, 0, 3)
  expect(gameBoard.receiveAttack(5, 0)).toBe(false)
})

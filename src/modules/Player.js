import GameBoard from './GameBoard.js'

const Player = (name = "Player") => {
  const board = GameBoard()

  function attack(opponent, x, y) {
    return opponent.board.receiveAttack(x, y)
  }

  return {
    name,
    board,
    attack
  }
}

export default Player

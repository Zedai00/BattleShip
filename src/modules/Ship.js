const Ship = (length) => {
  let hits = 0
  let hitCoords = []

  function hit(x, y) {
    hits++
    hitCoords.push({ x, y })
  }

  function isSunk() {
    return hits >= length
  }

  function isCoordHit(x, y) {
    return hitCoords.some(c => c.x === x && c.y === y)
  }

  return { length, hit, isSunk, isCoordHit }
}

export default Ship


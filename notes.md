# Ship

- Lenght: how many cells it would occupy
- hits: how many times it has been attacked
- hit: hit the ship one time
- isSunk: if the ship is attacked length times then its sunked
- isSunked: boolean to see if the ship is sunked or not

# GameBoard

- 10x10 array filled with 0
- if 1 then there is a ship in that cell
- Get a ship of random length / specified length
- place the ship at random coordinates or at specified location
- attack at a specified location
  - if attacked a ship increase its hit count
  - if not attacked add the coordinates to missed
- keep a count of ships and report if all ships have sunked

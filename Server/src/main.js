/*
import config from './config/config-TARGET_ENV'
import './utils'
import Map from './Map'
import Situation from './Situation'
import Store from './Store'

import CommandQueue from './CommandQueue'

console.log(`Built with ${config.environment} config`)

*/

const server = require('http').createServer()
const io = require('socket.io')(server)
const port = 9002

io.on('connect', socket => {
  console.log('connect ' + socket.id)

  socket.on('event', data => {
    console.log(data)
    socket.emit('event', 'Thanks!')
  })
  socket.on('disconnect', () => console.log('disconnect ' + socket.id))
})
server.listen(port, () => console.log('server listening on port ' + port))


var diff = require('deep-diff').diff
var applyChange = require('deep-diff').applyChange

const lhs = {
  words: [
    "hello",
    "world"
  ]
}

const rhs = {
  words: [
    "hello",
    "world",
    "!"
  ]
}

const differences = diff(lhs, rhs).reverse()

differences.forEach(difference => {
  applyChange(lhs, true, difference)
})

console.log(lhs)






/*


const clientCommandQueue = new CommandQueue()
const serverCommandQueue = new CommandQueue()

const seed = 105
const size = 2
const name = 'Zelda'

const map = new Map(size, seed)
const situation = new Situation()
const store = new Store()



situation.addNation("Valcom")
situation.addNation("Narnia")

store.addDevelopment({name: "Mill", consumption: {goods: 2}})

map.getTiles()[2].developments.push(store.developments["mill"])


// setInterval(() => tick(1000), 1000)



function tick(delta) {
  // Process Client Input
  const clientCommands = clientCommandQueue.get()
  clientCommands.forEach(clientCommand => {

  })
  clientCommandQueue.clear()

  // Process Tiles
  const tiles = map.getTiles()
  tiles.forEach(tile => tile.tick(delta))
}

function getStateData() {
  return {
    seed: seed,
    size: size,
    name: name,
    tiles: map.getTileData(),
    nations: situation.getNationData(),
    developments: store.getDevelopmentData(),
  }
}

// console.log(JSON.stringify(getStateData(), null, 4))

*/

import config from './config/config-development'
// TODO: Replace TARGET_ENV on build
import WebSocket from 'ws'
import './utils'
import WebSocketClient from './WebSocketClient'
import World from './World'
import Situation from './Situation'
import Store from './Store'
import CommandQueue from './CommandQueue'

console.log(`Built with ${config.environment} config`)

// import * as Diff from 'jsondiffpatch'

// const stateA = {
//   gold: 11
// }

// const stateB = {
//   gold: 22,
//   wood: 7
// }

// const patchAB = Diff.diff(stateA, stateB)

// console.log("State A")
// console.log(JSON.stringify(stateA, null, 4))

// console.log("State B")
// console.log(JSON.stringify(stateB, null, 4))

// console.log("Patch")
// console.log(JSON.stringify(patchAB, null, 4))

// Diff.patch(stateA, patchAB)

// console.log("State A")
// console.log(JSON.stringify(stateA, null, 4))


/**
 * Server state and websocket server
 */
export const serverState = {}

const webSocketClients = new Map()
serverState.webSocketClients = webSocketClients

const webSocketServer = new WebSocket.Server({ port: 8080 })
webSocketServer.on('connection', socket => new WebSocketClient(socket))


/**
 * Initialization of server state
 */
const seed = 105
const size = 1
const name = 'Zelda'

const world = new World(size, seed)
serverState.world = world

const situation = new Situation()
serverState.situation = situation

const store = new Store()
serverState.store = store

situation.addNation("Valcom")
situation.addNation("Narnia")

store.addDevelopment({name: "Mill", consumption: {wood: 2}})

world.getTiles()[0].developments.push(store.developments["mill"])
world.getTiles()[0].increaseResource('wood', 40)

// TODO: Brute force send state each frame to client
// TODO: Client should render state
// TODO: Think about how to break apart logic (tiles are king!)

/**
 * Command queue initialization
 */
const clientCommandQueue = new CommandQueue()
const serverCommandQueue = new CommandQueue()

setInterval(() => tick(1000), 1000)

function tick(delta) {
  // Process Client Input
  const clientCommands = clientCommandQueue.get()
  clientCommands.forEach(clientCommand => {

  })
  clientCommandQueue.clear()

  // Process Tiles
  const tiles = world.getTiles()
  tiles.forEach(tile => tile.tick(delta))
}

function getGameStateData() {
  return {
    seed: seed,
    size: size,
    name: name,
    tiles: world.getTileData(),
    nations: situation.getNationData(),
    developments: store.getDevelopmentData(),
  }
}

// console.log(JSON.stringify(getGameStateData(), null, 4))

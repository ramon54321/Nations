import config from './config/config-development'
// TODO: Replace TARGET_ENV on build
import './utils'
import { debug } from './utils'
import WebSocketServer from './networking/WebSocketServer'
import World from './core/World'
import Situation from './core/Situation'
import Store from './Store'
import CommandQueue from './messaging/CommandQueue'
import * as MessageBuilder from './messaging/messageBuilder'

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
export const serverState = {
  tickNumber: 0
}

const webSocketServer = new WebSocketServer()
serverState.webSocketServer = webSocketServer

/**
 * Initialization of server state
 */
const seed = 105
const size = 20
const name = 'Zelda'

const world = new World(size, seed)
serverState.world = world

const situation = new Situation()
serverState.situation = situation

const store = new Store()
serverState.store = store

situation.addNation('Valcom')
situation.addNation('Narnia')

store.addDevelopment({ name: 'Mill', consumption: { wood: 2 } })

world.getTilesFlat()[0].developments.push(store.developments['mill'])
world.getTilesFlat()[0].increaseResource('wood', 40)

// TODO: Client should render state
// TODO: Think about how to break apart logic (tiles are king!)

/**
 * Command queue initialization
 */
const clientCommandQueue = new CommandQueue()
const serverCommandQueue = new CommandQueue()

/**
 * Game tick logic
 */
setInterval(() => tick(1000), 1000)

function tick(delta) {
  // Increment tickNumber
  serverState.tickNumber++

  // Process Client Input
  const clientCommands = clientCommandQueue.get()
  clientCommands.forEach(clientCommand => {})
  clientCommandQueue.clear()

  // Process Tiles
  const tiles = world.getTilesFlat()
  tiles.forEach(tile => tile.tick(delta))

  // Send GameState to Client
  webSocketServer.broadcast(MessageBuilder.buildGameStateMessage())
}

/**
 * General functions
 */
export function getGameStateData() {
  return {
    seed: seed,
    size: size,
    name: name,
    tickNumber: serverState.tickNumber, 
    tiles: world.getTileData(),
    nations: situation.getNationData(),
    developments: store.getDevelopmentData(),
  }
}

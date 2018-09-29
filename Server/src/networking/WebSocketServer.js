import WebSocket from 'ws'
import WebSocketClient from './WebSocketClient'

class WebSocketServer {
  constructor() {
    this.webSocketClients = new Map()
    
    this.wss = new WebSocket.Server({ port: 8080 })
    this.wss.on('connection', socket => new WebSocketClient(this, socket))
  }

  sendTo(clientGuid, message) {
    message = JSON.stringify(message)
    const client = this.webSocketClients.get(clientGuid)
    if (!client) {
      console.log(`Error sending message to ${clientGuid}. Client does not exist.`)
      return
    }

    client.send(message)
  }

  broadcast(message) {
    message = JSON.stringify(message)
    for (let [guid, client] of this.webSocketClients) {
      client.send(message)
    }
  }
}

export default WebSocketServer


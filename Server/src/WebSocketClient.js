import { generateGuid } from './utils'

class WebSocketClient {
  constructor(webSocketServer, webSocket) {
    this.webSocketServer = webSocketServer
    this.webSocket = webSocket

    this.guid = generateGuid()

    /**
     * Register webSocketClient with serverState webSocketClients map
     */
    this.webSocketServer.webSocketClients.set(this.guid, this)

    /**
     * Register client messages to server call mapping
     */
    this.initializeMessageDispatcher()
  }

  initializeMessageDispatcher() {
    const shortGuid = this.getShortGuid()
    this.webSocket.on('message', message => {
      console.log(`${shortGuid}: ${message}`)
    })
  }

  send(message) {
    this.webSocket.send(message)
  }

  getShortGuid() {
    return this.guid.substr(0, 4)
  }
}

export default WebSocketClient

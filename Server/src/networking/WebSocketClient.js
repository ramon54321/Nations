import WebSocket from 'ws'
import { generateGuid } from '../utils'

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

    /**
     * Call onConnect event after client is initialized
     */
    this.onConnect()
  }

  initializeMessageDispatcher() {
    const shortGuid = this.getShortGuid()
    this.webSocket.on('message', message => {
      console.log(`${shortGuid}: ${message}`)
    })
  }

  onConnect() {

  }

  onDisconnect() {

  }

  /**
   * Should only be called from WebSocketServer
   * @param {string} message 
   */
  send(message) {
    /**
     * If the client has disconnected -> remove from list and call event
     */
    if (this.webSocket.readyState !== WebSocket.OPEN) {
      this.webSocketServer.webSocketClients.delete(this.guid)
      this.onDisconnect()
      return false
    }
    this.webSocket.send(message)
    return true
  }

  getShortGuid() {
    return this.guid.substr(0, 4)
  }
}

export default WebSocketClient

import { generateGuid } from "./utils";
import { serverState } from "./main";

class WebSocketClient {
  constructor(socket) {
    this.socket = socket

    this.guid = generateGuid()

    /**
     * Register webSocketClient with serverState webSocketClients map
     */
    serverState.webSocketClients.set(this.guid, this)


    /**
     * Register client messages to server call mapping
     */
    this.initializeMessageDispatcher()
  }

  initializeMessageDispatcher() {
    const shortGuid = this.getShortGuid()
    this.socket.on('message', message => {
      console.log(`${shortGuid}: ${message}`)
    })
  }

  getShortGuid() {
    return this.guid.substr(0, 4)
  }
}

export default WebSocketClient

import { decorate, observable } from 'mobx'

class ClientState {
  constructor() {
    this.nation = 'narnia'
  }

  getNation() {
    return this.nation
  }
}
decorate(ClientState, {

})

export default ClientState

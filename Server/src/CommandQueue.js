class CommandQueue {
  constructor() {
    this.commands = []
  }

  add(command) {
    this.commands.push(command)
  }

  get() {
    return this.commands
  }

  clear() {
    this.commands = []
  }
}

export default CommandQueue
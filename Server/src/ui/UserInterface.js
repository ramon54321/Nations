import Blessed from 'blessed'
import fs from 'fs'
import { serverState, config } from '../main';
import { debug } from '../utils';

class UserInterface {
  constructor() {
    this.promptText = ' >> '
    this.logFileName = 'server.log'

    this.initScreen()
    this.initLeft()
    this.initRight()
    this.render()
  }

  initScreen() {
    this.screen = Blessed.screen({
      dockBorders: true,
    })

    this.boxLeft = Blessed.box({
      top: 0,
      left: 0,
      width: '51%',
      height: '100%',
      dockBorders: true,
    })
    this.boxRight = Blessed.box({
      top: 0,
      right: 0,
      width: '51%',
      height: '100%',
      dockBorders: true,
    })

    this.screen.append(this.boxLeft)
    this.screen.append(this.boxRight)

    // this.screen.key(['escape'], (ch, key) => {
    //   return process.exit(0)
    // })
  }

  initLeft() {
    this.logBox = Blessed.log({
      bottom: 0,
      top: 0,
      right: 0,
      width: '100%',
      border: {
        type: 'line',
      },
    })

    this.boxLeft.append(this.logBox)

    fs.writeFile(this.logFileName, 'Nations Server - v0.0.1 - ' + new Date().toString() + "\n", 'utf8', () => {})
  }

  initRight() {
    this.statusBox = Blessed.box({
      bottom: 12,
      top: 0,
      right: 0,
      width: '100%',
      border: {
        type: 'line',
      },
      tags: true,
      dockBorders: true,
    })

    this.boxRight.append(this.statusBox)

    this.statusBox.setLine(0, `Nations Server - Version:${config.version}`)

    this.promptWrapperBox = Blessed.box({
      bottom: 0,
      right: 0,
      width: '100%',
      height: 13,
      border: {
        type: 'line',
      },
      tags: true,
      dockBorders: true,
    })
    this.promptEchoBox = Blessed.log({
      bottom: 1,
      right: 0,
      left: 0,
      height: 10,
      tags: true,
      dockBorders: true,
    })
    this.promptBox = Blessed.box({
      bottom: 0,
      right: 0,
      left: 0,
      height: 1,
      tags: true,
      dockBorders: true,
    })

    this.boxRight.append(this.promptWrapperBox)
    this.promptWrapperBox.append(this.promptEchoBox)
    this.promptWrapperBox.append(this.promptBox)

    this.promptBox.prompt = () => {
      this.promptBox.setContent(this.promptText)
      this.promptBox.focus()
    }

    this.promptBox.prompt()

    this.registerKeyBindings()
  }

  registerKeyBindings() {

    this.STATE_COMMAND = 0
    this.STATE_INPUT = 1
    this.state = this.STATE_COMMAND

    this.screen.on('keypress', (ch, key) => {
      const keyName = key.name
      if (this.state === this.STATE_COMMAND) {
        this.handleKeyCommand(keyName, ch)
      } else if (this.state === this.STATE_INPUT) {
        this.handleKeyInput(keyName, ch)
      }
    })
  }

  handleKeyCommand(keyName, ch) {
    switch(keyName) {
      case 'escape':
        return process.exit(0)
        break
      case 'i':
        this.state = this.STATE_INPUT
        break
      case 'o':
        ch === 'o' ? this.logBox.scroll(-1) : this.logBox.scroll(-25)
        break
      case 'l':
        ch === 'l' ? this.logBox.scroll(1) : this.logBox.scroll(25)
        break
    }
    this.render()
  }

  handleKeyInput(keyName, ch) {
    if(textKeys.indexOf(keyName) != -1) {
      this.promptBox.setContent(this.promptBox.content + ch)
    } else if (keyName === 'backspace') {
      if (this.promptBox.content.length > this.promptText.length) {
        this.promptBox.setContent(this.promptBox.content.substr(0, this.promptBox.content.length - 1))
      }
    } else if (keyName === 'enter') {
      const command = this.promptBox.content.substr(this.promptText.length)
      this.promptEchoBox.log(command)
      this.processCommand(command)
      this.promptBox.prompt()
    } else if (keyName === 'escape') {
      this.state = this.STATE_COMMAND
    }
    this.render()
  }

  processCommand(command) {

    switch(command) {
      case 'clear':
        this.render()
        break
    }

    debug(command)
  }

  log(data) {
    data = JSON.stringify(data, null, 4)
    this.logBox.log(data)
    if (data.indexOf('\n') > -1) {
      fs.appendFile(this.logFileName, new Date().toString() + ':\n' + data + "\n", 'utf8', () => {})
    } else {
      fs.appendFile(this.logFileName, new Date().toString() + ': ' + data + "\n", 'utf8', () => {})
    }
    this.render()
  }

  tick() {
    this.statusBox.setLine(1, `Tick Number: {green-fg}${serverState.tickNumber}{/green-fg}`)
    this.statusBox.setLine(3, `\t\tGame State`)
    this.statusBox.setLine(4, `Map Size:\t\t\t{green-fg}${serverState.gameState.size}{/green-fg}\t\tSeed:\t\t{green-fg}${serverState.gameState.seed}{/green-fg}`)
    this.statusBox.setLine(5, `Name:\t\t\t\t{green-fg}${serverState.gameState.name}{/green-fg}`)
    this.statusBox.setLine(6, `Tile Count:\t\t  {green-fg}${serverState.gameState.tiles.length}{/green-fg}`)

    this.render()
  }

  render() {
    this.statusBox.setLine(13, `State: {red-fg}${this.state === this.STATE_COMMAND ? "COMMAND" : "INPUT"}{/red-fg}`)

    this.screen.render()
  }
}

const textKeys = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'S-a',
  'S-b',
  'S-c',
  'S-d',
  'S-e',
  'S-f',
  'S-g',
  'S-h',
  'S-i',
  'S-j',
  'S-k',
  'S-l',
  'S-m',
  'S-n',
  'S-o',
  'S-p',
  'S-q',
  'S-r',
  'S-s',
  'S-t',
  'S-u',
  'S-v',
  'S-w',
  'S-x',
  'S-y',
  'S-z',
  '[',
  '{',
  ']',
  '}',
  ';',
  ':',
  '"',
  "'",
  ',',
  '.',
  '/',
  '<',
  '>',
  '?',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '-',
  '+',
  '_',
  '=',
  'space',
]

export default UserInterface

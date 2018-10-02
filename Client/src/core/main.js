import config from './config/config-TARGET_ENV'
export { config }
import Renderer from './Renderer'

import ReactDOM from 'react-dom'
import React from 'react'
import Panel from '../components/presentational/Panel'
import GameState from './GameState';

window.onload = function() {
  initConfig()
  initAssets()
  initKeyListener()
  initGameState()
  initRenderer()
  initWebSocketConnection()
}

function initConfig() {
  console.log(`Built with ${config.environment} config`)
  document.config = config
}

function initAssets() {
  document.assets = {
    tiles: {
      mountain: document.getElementById('source-mountain'),
      ocean: document.getElementById('source-ocean'),
      field: document.getElementById('source-field'),
      forest: document.getElementById('source-forest'),
    },
    developments: {
      mill: document.getElementById('source-developments-mill'),
    },
  }
}

function initKeyListener() {
  document.keys = {}
  window.onkeyup = function(e) {
    document.keys[e.keyCode] = false
  }
  window.onkeydown = function(e) {
    document.keys[e.keyCode] = true
  }
}

function initGameState() {
  document.gameState = null
}

function initRenderer() {
  document.renderer = new Renderer()
}

function initWebSocketConnection() {
  const url = 'ws://localhost:8080'
  const connection = new WebSocket(url)

  connection.onopen = () => {
    connection.send('Hello, I connected.')
  }

  connection.onmessage = e => {
    const message = JSON.parse(e.data)
    // TODO: Handle messages properly

    if (message.type === 'game-state') {
      if (!document.gameState) {
        document.gameState = new GameState(message.data)
        document.renderer.onInitialGameState()
        initUserInterface()
      } else {
        document.gameState.updateState(message.data)
      }
    }
  }

  document.send = data => connection.send(data)
}

function initUserInterface() {
  ReactDOM.render(<Panel header="Nations" />, document.getElementById('nations'))
}

export { document }

import World from './World'
import ReactDOM from 'react-dom'
import React from 'react'
import Panel from '../components/presentational/Panel'
import Renderer from './Renderer'
import config from './config-TARGET_ENV'

// var socket = require('socket.io-client')('http://localhost:9002')
// socket.on('connect', function() {
//   console.log('Connected to Server')
//   socket.emit('management', 'ack')
// })
// socket.on('management', function(data) {
//   console.log(data)
// })
// socket.on('disconnect', function() {
//   console.log('Disconnected from Server')
// })

const url = 'ws://localhost:8080'
const connection = new WebSocket(url)

connection.onopen = () => {
  connection.send('hey')
}

connection.onmessage = e => {
  console.log(e.data)
}

if (typeof window === 'undefined') {
  var isNode = true
} else {
  var isNode = false
}

var resources
var keys

window.onload = function() {
  if (isNode) {
    var document = {}
    resources = {}
    console.log('Running in Node')
  } else {
    var document = window.document
    resources = {
      tiles: {
        mountain: document.getElementById('source-mountain'),
        ocean: document.getElementById('source-ocean'),
        field: document.getElementById('source-field'),
        forest: document.getElementById('source-forest'),
      },
    }
    console.log('Running in Browser')
  }

  document.send = (data) => connection.send(data)

  console.log(`Built with ${config.environment} config`)
  document.config = config

  keys = {}
  document.keys = keys
  window.onkeyup = function(e) {
    // console.log("Up: " + e.keyCode)
    keys[e.keyCode] = false
  }
  window.onkeydown = function(e) {
    keys[e.keyCode] = true
  }

  const world = new World(20)

  const renderer = new Renderer(world)

  renderer.render()

  ReactDOM.render(<Panel header="Nations" world={world} />, document.getElementById('nations'))
}

export { document, resources, keys }

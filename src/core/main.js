import World from './World'
import ReactDOM from 'react-dom'
import React from 'react'
import Panel from '../components/presentational/Panel'
import Renderer from './Renderer'

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

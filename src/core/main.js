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

window.onload = function () { 
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
  
  const world = new World()
  
  const renderer = new Renderer(world)
  
  renderer.render()
  
  ReactDOM.render(<Panel header="Nations" world={world} />, document.getElementById('nations'))
}

export { document, resources }

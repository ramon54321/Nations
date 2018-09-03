import World from './World'
import ReactDOM from 'react-dom'
import React from 'react'
import Panel from '../components/presentational/Panel'

if (typeof window === 'undefined') {
  var isNode = true
} else {
  var isNode = false
}

if (isNode) {
  var document = {}
  console.log('Running in Node')
} else {
  var document = window.document
  console.log('Running in Browser')
}

export { document }

const world = new World()

ReactDOM.render(<Panel header="Nations" />, document.getElementById('nations'))

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

window.addEventListener('load', () => {
  const mountNode = document.createElement('div')
  mountNode.style.height = '100%'

  document.body.appendChild(mountNode)
  ReactDOM.render(<App />, mountNode)
})

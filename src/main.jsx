import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CurrentPosition from './context/CurrentPosition'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrentPosition>
      <App />
    </CurrentPosition>
  </React.StrictMode>
)

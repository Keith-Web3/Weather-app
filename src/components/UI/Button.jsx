import React from 'react'
import '../../sass/UI/button.scss'

export default function Button({ children, extraStyles, onClick }) {
  return (
    <button className="button-component" style={extraStyles} onClick={onClick}>
      {children}
    </button>
  )
}

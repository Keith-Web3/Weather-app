import React from 'react'
import closeImg from '../assets/close.svg'

export default function Navigation() {
  return (
    <div className="nav">
      <img src={closeImg} alt="close" />
      <Navigation />
    </div>
  )
}

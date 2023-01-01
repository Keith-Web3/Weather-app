import React from 'react'
import '../../sass/sub-components/highlight.scss'

export default function Highlights({ value, unit, title, child }) {
  return (
    <div className="highlight">
      <p>{title}</p>
      <p>
        <span className="highlight__value">{value}</span>
        <span className="highlight__unit">{unit}</span>
      </p>
      {child && child}
    </div>
  )
}

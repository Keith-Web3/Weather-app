import React from 'react'
import '../../sass/UI/progress-bar.scss'

export default function ProgressBar({ progress }) {
  const progressBarStyle = {
    backgroundImage: `linear-gradient(to right, #FFEC65 ${progress}%, #E7E7EB ${progress}%)`,
  }
  return (
    <div className="progress-bar">
      <p>
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </p>
      <div style={progressBarStyle}></div>
      <p>%</p>
    </div>
  )
}

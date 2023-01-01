import React from 'react'
import arrowImg from '../../assets/location-arrow-solid.svg'
import '../../sass/UI/wind-direction.scss'

export default function WindDirection({ direction }) {
  return (
    <div className="wind-direction">
      <div>
        <img src={arrowImg} alt="wind direction" />
      </div>
      <p>{direction}</p>
    </div>
  )
}

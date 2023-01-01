import React, { useContext } from 'react'
import locationImg from '../../assets/location-dot-solid.svg'
import { currentData } from '../../context/CurrentPosition'
import '../../sass/sub-components/present-details.scss'

export default function PresentDetails({ location }) {
  const ctx = useContext(currentData)
  const date = new Date().toDateString().slice(0, -5)
  return (
    <>
      <p className="temperature">
        <span>{ctx.weatherData.tempC}</span>
        <span>℃</span>
      </p>
      <p className="condition">{ctx.weatherData.weatherShort}</p>
      <p className="date">
        Today <span>•</span> {date}
      </p>
      <p className="location">
        <img src={locationImg} alt="location" /> {`${location}`}
      </p>
    </>
  )
}

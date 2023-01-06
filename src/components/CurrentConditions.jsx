import React, { useState, useEffect } from 'react'
import Header from './sub-components/Header'
import PresentDetails from './sub-components/PresentDetails'

export default function CurrentConditions({
  weatherCondition,
  location,
  handleShowNav,
  showNav,
}) {
  const [weatherImg, setWeatherImg] = useState('')
  useEffect(() => {
    import(`../assets/${weatherCondition || 'Clear'}.png`).then(
      ({ default: weatherImg }) => {
        setWeatherImg(weatherImg)
      }
    )
  }, [])

  return (
    <section className="section--1" style={{ display: showNav[1] }}>
      <Header handleShowNav={handleShowNav} />
      <img src={weatherImg} alt="current weather condition" />
      <PresentDetails location={location} />
    </section>
  )
}

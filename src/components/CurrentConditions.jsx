import React, { useState, useEffect } from 'react'
import Header from './sub-components/Header'
import PresentDetails from './sub-components/PresentDetails'

export default function CurrentConditions({ weatherCondition, location }) {
  const [weatherImg, setWeatherImg] = useState('')
  useEffect(() => {
    import(`../assets/${weatherCondition}.png`).then(
      ({ default: weatherImg }) => {
        setWeatherImg(weatherImg)
      }
    )
  }, [])
  return (
    <section className="section--1">
      <Header />
      <img src={weatherImg} alt="current weather condition" />
      <PresentDetails location={location} />
    </section>
  )
}

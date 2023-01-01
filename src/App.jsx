import React, { useContext } from 'react'
import CurrentConditions from './components/CurrentConditions'
import Forecasts from './components/Forecasts'
import Highlights from './components/Highlights'
import Navigation from './components/Navigation'
import { currentData } from './context/CurrentPosition'
import './sass/index.scss'

export default function App() {
  const ctx = useContext(currentData)
  return (
    <main>
      <Navigation />
      <CurrentConditions
        weatherCondition={ctx.weatherData.weatherShort}
        location={ctx.loc}
      />
      <section className="section--2">
        <Forecasts />
        <Highlights />
      </section>
    </main>
  )
}

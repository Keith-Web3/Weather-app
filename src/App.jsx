import React, { useContext, useState } from 'react'
import CurrentConditions from './components/CurrentConditions'
import Forecasts from './components/Forecasts'
import Highlights from './components/Highlights'
import Navigation from './components/Navigation'
import { currentData } from './store/CurrentPosition'
import './sass/index.scss'

export default function App() {
  const ctx = useContext(currentData)
  const [showNav, setShowNav] = useState(false)
  function handleShowNav() {
    setShowNav(prevVal => !prevVal)
  }
  return (
    <main>
      {showNav ? (
        <Navigation handleShowNav={handleShowNav} />
      ) : (
        <CurrentConditions
          handleShowNav={handleShowNav}
          weatherCondition={ctx.weatherData.weatherInfo}
          location={ctx.loc}
        />
      )}
      <section className="section--2">
        <Forecasts />
        <Highlights />
      </section>
    </main>
  )
}

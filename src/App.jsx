import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import CurrentConditions from './components/CurrentConditions'
import Forecasts from './components/Forecasts'
import Highlights from './components/Highlights'
import Navigation from './components/Navigation'
import { currentData } from './store/CurrentPosition'
import './sass/index.scss'
import Modal from './components/Modal'

export default function App() {
  const ctx = useContext(currentData)
  const [showNav, setShowNav] = useState(false)
  function handleShowNav() {
    setShowNav(prevVal => !prevVal)
  }
  document.body.style.overflowY = ctx.showModal ? 'hidden' : 'unset'
  document.querySelector('html').style.overflowY = ctx.showModal
    ? 'hidden'
    : 'unset'

  return (
    <main>
      {showNav ? (
        <Navigation handleShowNav={handleShowNav} showNav={showNav} />
      ) : (
        <CurrentConditions
          showNav={showNav}
          handleShowNav={handleShowNav}
          weatherCondition={ctx.weatherData.weatherInfo}
          location={ctx.loc}
        />
      )}
      <section className="section--2">
        <Forecasts />
        <Highlights />
        {ctx.showModal && (
          <Modal eventlisteners={[null, ctx.reRender]} show={false}>
            {ctx.errorMessage || 'Please enable location to use this app'}
          </Modal>
        )}
      </section>
    </main>
  )
}

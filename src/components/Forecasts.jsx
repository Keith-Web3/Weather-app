import React, { useContext } from 'react'
import Forecast from './sub-components/Forecast'
import '../sass/forecasts.scss'
import { nanoid } from 'nanoid'
import { currentData } from '../store/CurrentPosition'

export default function Forecasts() {
  const { forecast } = useContext(currentData)
  const DUMMY_DATA = forecast.map(([temp2, temp1, img]) => ({
    img,
    temp1,
    temp2,
  }))
  return (
    <div className="forecasts">
      {DUMMY_DATA.map((data, idx) => (
        <Forecast idx={idx} {...data} key={nanoid()} />
      ))}
    </div>
  )
}

import React from 'react'
import Forecast from './sub-components/Forecast'
import '../sass/forecasts.scss'
import { nanoid } from 'nanoid'

const DUMMY_DATA = [
  { img: 'Hail', temp1: 16, temp2: 11 },
  { img: 'HeavyCloud', temp1: 16, temp2: 11 },
  { img: 'HeavyRain', temp1: 16, temp2: 11 },
  { img: 'LightCloud', temp1: 16, temp2: 11 },
  { img: 'LightRain', temp1: 16, temp2: 11 },
  // { img: 'Shower', temp1: 16, temp2: 11 },
  // { img: 'Sleet', temp1: 16, temp2: 11 },
  // { img: 'Snow', temp1: 16, temp2: 11 },
  // { img: 'Thunderstorm', temp1: 16, temp2: 11 },
]
export default function Forecasts() {
  return (
    <div className="forecasts">
      {DUMMY_DATA.map((data, idx) => (
        <Forecast idx={idx} {...data} key={nanoid()} />
      ))}
    </div>
  )
}

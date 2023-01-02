import React, { useContext } from 'react'
import ProgressBar from './UI/ProgressBar'
import WindDirection from './UI/WindDirection'
import Highlight from './sub-components/Highlight'
import '../sass/highlights.scss'
import { nanoid } from 'nanoid'
import { currentData } from '../store/CurrentPosition'

export default function Highlights() {
  const ctx = useContext(currentData)
  if (!ctx.loc) return

  const DUMMY_DATA = [
    {
      title: 'Wind status',
      unit: 'mph',
      value: ctx.weatherData.windMPH,
      child: <WindDirection direction={ctx.weatherData.windDir} />,
    },
    {
      title: 'Humidity',
      unit: '%',
      value: ctx.weatherData.humidity,
      child: <ProgressBar progress={ctx.weatherData.humidity} />,
    },
    { title: 'Visibility', value: ctx.weatherData.visibilityMI, unit: 'mi' },
    { title: 'Air Pressure', value: ctx.weatherData.pressureMB, unit: 'mb' },
  ]

  return (
    <>
      <p className="highlights__text">Today's Highlights</p>
      <div className="highlights">
        {DUMMY_DATA.map(data => (
          <Highlight {...data} key={nanoid()} />
        ))}
      </div>
    </>
  )
}

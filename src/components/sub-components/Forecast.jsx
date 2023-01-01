import React, { useState, useEffect } from 'react'
import '../../sass/sub-components/forecast.scss'
// import weather1 from '../../assets/Hail.png'
// import weather2 from '../../assets/HeavyCloud.png'
// import weather3 from '../../assets/HeavyRain.png'
// import weather4 from '../../assets/LightCloud.png'
// import weather5 from '../../assets/LightRain.png'
// import weather6 from '../../assets/Shower.png'
// import weather7 from '../../assets/Sleet.png'
// import weather8 from '../../assets/Snow.png'
// import weather9 from '../../assets/Thunderstorm.png'
export default function Forecast({ img, idx, temp1, temp2 }) {
  const [weatherImgSrc, setWeatherImgSrc] = useState('')
  const [date, setDate] = useState(
    new Date(new Date().getTime() + 86400000 * (idx + 1))
      .toDateString()
      .slice(0, -5)
  )

  useEffect(() => {
    import(`../../assets/${img}.png`).then(({ default: weatherImg }) => {
      setWeatherImgSrc(weatherImg)
    })
  }, [])

  return (
    <div className="forecast">
      <p className="forecast__date">{idx ? date : 'Tomorrow'}</p>
      <img src={weatherImgSrc} alt="weather pic" />
      <p className="forecast__temperature">
        <span className="forecast__temperature__1">{temp1}℃</span>
        <span className="forecast__temperature__2">{temp2}℃</span>
      </p>
    </div>
  )
}

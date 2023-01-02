import React, { useState, useEffect } from 'react'
import weatherCodes from './weatherCodes'
const currentData = React.createContext({
  loc: [],
  weatherData: {},
  forecast: [],
})

export function CurrentPosition(props) {
  const [currentLocationData, setCurrentLocationData] = useState({
    city: '',
    weatherInfo: {},
    forecast: [],
  })
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function ({ coords: { latitude, longitude } }) {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key':
              '68ca7f80e9mshdaca8240d43ab1ap178984jsn99d2a212d1c9',
            'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com',
          },
        }

        fetch(
          `https://aerisweather1.p.rapidapi.com/observations/${latitude},${longitude}`,
          options
        )
          .then(response => {
            if (!response.ok) throw new Error('Try again')
            return response.json()
          })
          .then(
            ({
              response: {
                place: { city },
                ob: {
                  dewpointC,
                  tempC,
                  humidity,
                  pressureMB,
                  visibilityMI,
                  windMPH,
                  windDir,
                  weatherPrimaryCoded,
                },
              },
            }) => {
              setCurrentLocationData(prevData => ({
                ...prevData,
                city: city.split('/')[0],
                weatherInfo: {
                  dewpointC,
                  tempC,
                  humidity,
                  pressureMB,
                  visibilityMI,
                  windMPH: windMPH ?? 'unknown',
                  windDir: windDir ?? 'unknown',
                  weatherInfo: weatherCodes[weatherPrimaryCoded.slice(2)],
                },
              }))
            }
          )
          .then(() =>
            fetch(
              `https://aerisweather1.p.rapidapi.com/forecasts/${latitude},${longitude}`,
              options
            )
          )
          .then(response => response.json())
          .then(({ response: [{ periods }] }) => {
            const arr = periods.map(
              ({ minTempC, maxTempC, weatherPrimaryCoded }) => [
                minTempC,
                maxTempC,
                weatherCodes[weatherPrimaryCoded.match(/:\w+$/)[0].slice(1)],
              ]
            )
            setCurrentLocationData(prevData => ({
              ...prevData,
              forecast: arr,
            }))
          })
          .catch(err => console.error(err))
      },
      function (error) {
        console.log(error)
      }
    )
  }, [JSON.stringify(currentLocationData)])
  return (
    <currentData.Provider
      value={{
        loc:
          currentLocationData.city[0]?.toUpperCase() +
          currentLocationData.city?.slice(1),
        weatherData: currentLocationData.weatherInfo,
        forecast: currentLocationData.forecast,
      }}
    >
      {props.children}
    </currentData.Provider>
  )
}

export default React.memo(CurrentPosition)
export { currentData }
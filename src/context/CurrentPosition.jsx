import React, { useState, useEffect, useMemo } from 'react'
const currentData = React.createContext({
  loc: [],
})

export function CurrentPosition(props) {
  const [currentLocationData, setCurrentLocationData] = useState({
    city: '',
    weatherInfo: {},
  })
  console.log(currentLocationData),
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        function ({ coords: { latitude, longitude } }) {
          console.log(latitude, longitude)
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
                    weatherShort,
                  },
                },
              }) => {
                setCurrentLocationData(prevData => ({
                  city: city.split('/')[0],
                  weatherInfo: {
                    dewpointC,
                    tempC,
                    humidity,
                    pressureMB,
                    visibilityMI,
                    windMPH,
                    windDir,
                    weatherShort,
                  },
                }))
              }
            )
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
      }}
    >
      {props.children}
    </currentData.Provider>
  )
}

export default React.memo(CurrentPosition)
export { currentData }

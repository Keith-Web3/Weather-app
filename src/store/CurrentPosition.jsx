import React, { useState, useEffect } from 'react'
import weatherCodes from './weatherCodes'
const currentData = React.createContext({
  loc: [],
  weatherData: {},
  forecast: [],
  showModal: false,
  inputLocation: [],
  updateInputLocation: () => {},
})

export function CurrentPosition(props) {
  const [currentLocationData, setCurrentLocationData] = useState({
    city: '',
    weatherInfo: {},
    forecast: [],
  })
  const [inputLocation, setInputLocation] = useState([])
  const [causeRerender, setCauseRerender] = useState(0)
  const [showModal, setShowModal] = useState(false)
  function updateInputLocation(val) {
    return () => setInputLocation(val)
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function ({ coords: { latitude, longitude } }) {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key':
              '8f091fb8d1mshafae696642602e9p120e55jsnf8db7eeec3a5',
            'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com',
          },
        }

        fetch(
          `https://aerisweather1.p.rapidapi.com/observations/${
            inputLocation?.[0] || latitude
          },${inputLocation?.[1] || longitude}`,
          options
        )
          .then(response => {
            if (!response.ok) throw new Error('Try again')
            return response.json()
          })
          .then(({ success, error, response }) => {
            if (!success) throw new Error(error.description)
            const {
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
            } = response
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
          })
          .then(() =>
            fetch(
              `https://aerisweather1.p.rapidapi.com/forecasts/${
                inputLocation?.[0] || latitude
              },${inputLocation?.[1] || longitude}`,
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
            setShowModal(false)
          })
          .catch(err => {
            window.alert(err)
            console.error(err)
          })
      },
      function (error) {
        setShowModal(true)
      }
    )
  }, [
    JSON.stringify(currentLocationData),
    causeRerender,
    JSON.stringify(inputLocation),
  ])
  return (
    <currentData.Provider
      value={{
        loc:
          currentLocationData.city[0]?.toUpperCase() +
          currentLocationData.city?.slice(1),
        weatherData: currentLocationData.weatherInfo,
        forecast: currentLocationData.forecast,
        showModal: showModal,
        reRender: () => {
          setCauseRerender(prevVal => prevVal + 1)
          setInputLocation([])
        },
        inputLocation: inputLocation,
        updateInputLocation: updateInputLocation,
      }}
    >
      {props.children}
    </currentData.Provider>
  )
}

export default React.memo(CurrentPosition)
export { currentData }

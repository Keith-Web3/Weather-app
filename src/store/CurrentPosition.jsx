import React, { useState, useEffect } from 'react'
import axios from 'axios'
import weatherCodes from './weatherCodes'
const currentData = React.createContext({
  loc: [],
  weatherData: {},
  forecast: [],
  showModal: false,
  inputLocation: [],
  updateInputLocation: () => {},
  errorMessage: '',
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
  const [errorMessage, setErrorMessage] = useState('')
  function updateInputLocation(val) {
    return () => setInputLocation(val)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function ({ coords: { latitude, longitude } }) {
        const url = axios.create({
          baseURL: 'https://aerisweather1.p.rapidapi.com',
          headers: {
            'X-RapidAPI-Key':
              '8f091fb8d1mshafae696642602e9p120e55jsnf8db7eeec3a5',
            'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com',
          },
        })

        const query1 = inputLocation?.[0] || latitude
        const query2 = inputLocation?.[1] || longitude

        axios
          .all([
            url.request(`/observations/${query1},${query2}`),
            url.request(`/forecasts/${query1},${query2}`),
          ])
          .then(([{ data: data1 }, { data: data2 }]) => {
            if (data1.error !== null || data2.error !== null)
              throw new Error(
                data1.error?.description || data2.error?.description
              )

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
            } = data1.response

            const [{ periods }] = data2.response

            const arr = periods.map(
              ({ minTempC, maxTempC, weatherPrimaryCoded }) => [
                minTempC,
                maxTempC,
                weatherCodes[weatherPrimaryCoded.match(/:\w+$/)[0].slice(1)],
              ]
            )
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
              forecast: arr,
            }))
            setShowModal(false)
          })
          .catch(err => {
            setErrorMessage(err.message)
            setShowModal(true)
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
        errorMessage: errorMessage,
      }}
    >
      {props.children}
    </currentData.Provider>
  )
}

export default React.memo(CurrentPosition)
export { currentData }

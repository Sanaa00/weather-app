/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import Search from './Search'
import DropDown from './DropDown'
import {
  useGet5DayForecastByCoordsQuery,
  useGet5DayForecastQuery,
  useGetCurrentWeatherQuery,
  useGetWeatherQuery,
} from '../api/api'
import getWeatherIcon from './WeatherIcons'
// import DayOfWeek from './DayOfWeek'
import Daysforecast from './Daysforecast'

function Weather() {
  const [search, setSearch] = useState('')
  const [cachedLocations, setCachedLocations] = useState([])
  const [nextFiveDaysData, setNextFiveDaysData] = useState([])

  const [currentLocation, setCurrentLocation] = useState({
    lat: 10,
    lon: 10,
  })

  const {
    data: currentWeather,
    isLoading: currentweatherLodaing,
    error: currentWeatherError,
  } = useGetCurrentWeatherQuery(currentLocation)

  const {
    data: locationWeather,
    isLoading: locationLoading,
    isError: locationIsError,
    error: locationError,
  } = useGetWeatherQuery(search, { skip: search === '' })

  const {
    data: daysForecastBySearch,
    isError: forecastSearchIsError,
    error: forecastSearchError,
    isLoading: forecastSearchIsLoading,
  } = useGet5DayForecastQuery(search, { skip: search === '' })

  const {
    data: daysForecast,
    isError: currentForcastIsError,
    error: currentForcastError,
    isLoading: currentForcastIsLoading,
  } = useGet5DayForecastByCoordsQuery(currentLocation)
  console.log('forecast', daysForecast)
  // const nextFiveDays = (
  //   search ? daysForecastBySearch : daysForecast
  // )?.list?.filter((item, index) => index < 5)
  // function nextFiveDays() {
  //   const filteredData = []
  //   const seenDates = new Set()(
  //     search ? daysForecastBySearch : daysForecast
  //   ).forEach((entry, index) => {
  //     const date = new Date(entry.dt * 1000)
  //     const day = date.getDate()

  //     if (!seenDates.has(day)) {
  //       seenDates.add(day)
  //       filteredData.push(entry)
  //     }

  //     if (filteredData.length >= 5) {
  //       return
  //     }

  //     if ((index + 1) % 8 === 0) {
  //       seenDates.clear()
  //     }
  //   })

  //   return filteredData
  // }
  useEffect(() => {
    // function filterNextFiveDays() {
    if (!search || (!daysForecastBySearch && !daysForecast)) {
      // No search query or forecast data available
      return
    }

    const weatherData = search ? daysForecastBySearch : daysForecast
    const filteredData = []
    const seenDates = new Set()

    weatherData.forEach((entry, index) => {
      const date = new Date(entry.dt * 1000)
      const day = date.getDate()

      if (!seenDates.has(day)) {
        seenDates.add(day)
        filteredData.push(entry)
      }

      if (filteredData.length >= 5) {
        return
      }

      if ((index + 1) % 8 === 0) {
        seenDates.clear()
      }
    })

    setNextFiveDaysData(filteredData)
    // }

    // filterNextFiveDays()
  }, [search, daysForecast, daysForecastBySearch])
  useEffect(() => {
    const fetchData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position && position.coords) {
              const { latitude, longitude } = position.coords
              setCurrentLocation({ lat: latitude, lon: longitude })
            }
          },
          (error) => {
            console.error('Error fetching geolocation:', error)
          }
        )
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    const fetchCachedLocations = () => {
      const cachedLocationsData = localStorage.getItem('cachedLocations')
      if (cachedLocationsData) {
        setCachedLocations(JSON.parse(cachedLocationsData))
      }
    }

    fetchData()
    fetchCachedLocations()
  }, [])

  useEffect(() => {
    const fetchCachedLocations = () => {
      const cachedLocationsData = localStorage.getItem('cachedCities')
      if (cachedLocationsData) {
        setCachedLocations(JSON.parse(cachedLocationsData))
      }
    }

    fetchCachedLocations()
  }, [])

  const handleLocationChange = (location) => {
    setSearch(location)
  }

  if (
    currentForcastIsLoading ||
    forecastSearchIsLoading ||
    locationLoading ||
    currentweatherLodaing
  )
    return (
      <div className='flex justify-center items-center h-3/4 w-3/4 '>
        <p>Loading...</p>
      </div>
    )

  if (
    locationError &&
    locationIsError &&
    currentWeatherError &&
    currentWeatherError
  )
    return (
      <div className='flex justify-center items-center h-3/4 w-3/4 '>
        <p>
          {locationError?.message}
          {currentWeatherError?.message}
        </p>
      </div>
    )
  if (
    forecastSearchError &&
    currentForcastError &&
    currentForcastIsError &&
    forecastSearchIsError
  )
    return (
      <div className='flex justify-center items-center h-3/4 w-3/4 '>
        <p>
          {forecastSearchError?.message}
          {currentForcastError?.message}
        </p>
      </div>
    )
  return (
    <div className='flex justify-between items-center bg-slate-100 w-3/4 h-3/4 rounded-sm shadow p-5'>
      <div className='flex flex-col justify-center items-center w-1/3 bg-gradient-to-br from-cyan-500 to-sky-500 h-full rounded'>
        {getWeatherIcon(
          search ? locationWeather : currentWeather,
          'text-slate-100',
          'h-20',
          'w-20'
        )}
        <p className='mt-10 text-3xl text-slate-100'>
          {(search ? locationWeather : currentWeather)?.main?.temp}°C
        </p>
        <div className='flex flex-col justify-center items-center mt-10 text-slate-100 text-sm'>
          <p>Today</p>
          <p>{(search ? locationWeather : currentWeather)?.name}</p>
        </div>
        <div className='flex flex-col justify-center items-center mt-10 text-slate-100 text-sm'>
          <p>
            Humidity:{' '}
            {(search ? locationWeather : currentWeather)?.main?.humidity}%
          </p>
          <p>
            Wind: {(search ? locationWeather : currentWeather)?.wind?.speed}{' '}
            km/h
          </p>
        </div>
      </div>
      <div className='w-2/3 flex flex-col px-2 h-full'>
        <div className='flex justify-between items-center'>
          <Search
            setSearch={setSearch}
            setCachedLocations={setCachedLocations}
            cachedLocations={cachedLocations}
          />
          <div>
            <DropDown
              locations={cachedLocations}
              handleLocationChange={handleLocationChange}
              name={currentWeather?.name}
            />
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <Daysforecast
            nextFiveDays={nextFiveDaysData}
            search={search}
            daysForecast={daysForecast}
            daysForecastBySearch={daysForecastBySearch}
          />
          {/* {nextFiveDays?.map((day, index) => {
            return (
              <div
                key={index}
                className='flex flex-col justify-center items-center mt-20'
              >
                <DayOfWeek timestamp={day?.dt} />
                <div className='mt-10'>
                  {getWeatherIcon(
                    (search ? daysForecastBySearch : daysForecast)?.list[index],
                    'text-sky-500',
                    'h-10',
                    'w-10'
                  )}
                </div>

                <p className='text-lg text-neutral-400 mt-10'>
                  {day?.main?.temp}°C
                </p>
                <div className='text-neutral-400 flex justify-center items-center flex-col mt-10 text-xs'>
                  <p>{day?.wind?.speed} km/h</p>
                  <p> {day?.main?.humidity}%</p>
                </div>
              </div>
            )
          })} */}
        </div>
      </div>
    </div>
  )
}

export default Weather

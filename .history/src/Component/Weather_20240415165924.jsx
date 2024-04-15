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
import Daysforecast from './Daysforecast'

function Weather() {
  const [search, setSearch] = useState('')
  const [cachedLocations, setCachedLocations] = useState([])
  const [nextFiveDaysData, setNextFiveDaysData] = useState([])
  const [currentLocation, setCurrentLocation] = useState()

  const {
    data: currentWeather,
    isLoading: currentweatherLodaing,
    error: currentWeatherError,
  } = useGetCurrentWeatherQuery(currentLocation, {
    skip: !currentLocation,
  })

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
  } = useGet5DayForecastByCoordsQuery(currentLocation, {
    skip: !currentLocation,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position && position.coords) {
              const { latitude, longitude } = position.coords
              const location = { lat: latitude, lon: longitude }
              setCurrentLocation(location)
              localStorage.setItem('currentLocation', JSON.stringify(location))
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

    fetchData()
  }, [])

  useEffect(() => {
    // Fetch cached locations from local storage
    const fetchCachedLocations = () => {
      const cachedLocations = localStorage.getItem('cachedCities')
      if (cachedLocations) {
        setCachedLocations(JSON.parse(cachedLocations))
      }
    }

    fetchCachedLocations()
  }, [setCachedLocations, search])

  useEffect(() => {
    // Fetch weather forecast for the selected location
    const weatherData = search ? daysForecastBySearch?.list : daysForecast?.list

    if (!Array.isArray(weatherData) || !weatherData.length) {
      return
    }

    const filteredData = []
    const seenDays = new Set()

    for (let entry of weatherData) {
      const date = new Date(entry.dt * 1000)
      const day = date.getDate()

      if (!seenDays.has(day)) {
        seenDays.add(day)
        filteredData.unshift(entry)
      }

      if (filteredData.length >= 5) {
        break
      }
    }

    setNextFiveDaysData(filteredData.reverse())
  }, [search, daysForecast, daysForecastBySearch])

  const handleLocationChange = (location) => {
    setSearch(location)
    // Store the searched location in local storage
    const updatedCachedLocations = [...new Set([location, ...cachedLocations])]
    setCachedLocations(updatedCachedLocations)
    localStorage.setItem('cachedCities', JSON.stringify(updatedCachedLocations))
  }

  if (
    currentForcastIsLoading ||
    forecastSearchIsLoading ||
    locationLoading ||
    currentweatherLodaing ||
    !currentLocation
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
              search={search}
              locations={cachedLocations}
              handleLocationChange={handleLocationChange}
              name={currentWeather?.name}
            />
          </div>
        </div>

        <Daysforecast
          nextFiveDays={nextFiveDaysData}
          search={search}
          daysForecast={daysForecast}
          daysForecastBySearch={daysForecastBySearch}
        />
      </div>
    </div>
  )
}

export default Weather

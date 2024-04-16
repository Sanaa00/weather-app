import { useEffect, useMemo, useState } from 'react'
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
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position && position.coords) {
              const { latitude, longitude } = position.coords
              const location = { lat: latitude, lon: longitude }
              setCurrentLocation(location)
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
    const fetchCachedLocations = () => {
      const cachedLocations = localStorage.getItem('cachedCities')
      if (cachedLocations) {
        setCachedLocations(JSON.parse(cachedLocations))
      }
    }

    fetchCachedLocations()
  }, [setCachedLocations])

  const weatherData = useMemo(() => {
    const data = search ? daysForecastBySearch?.list : daysForecast?.list
    if (!Array.isArray(data) || !data.length) {
      return []
    }

    const filteredData = []
    const seenDays = new Set()

    for (let entry of data) {
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

    return filteredData.reverse()
  }, [search, daysForecast, daysForecastBySearch])

  const handleLocationChange = (location) => {
    setSearch(location)
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
    <div className='flex flex-col lg:flex-row justify-between items-center bg-slate-100 w-full min-h-screen lg:w-3/4 lg:h-3/4 rounded-sm shadow p-5'>
      {' '}
      <div className='w-full mb-5 lg:mb-0 flex lg:hidden flex-col justify-start items-start  lg:justify-between lg:items-center'>
        <div>
          <Search
            setSearch={setSearch}
            setCachedLocations={setCachedLocations}
            cachedLocations={cachedLocations}
          />
        </div>

        <div className='mt-5 lg:mt-0'>
          <DropDown
            search={search}
            locations={cachedLocations}
            handleLocationChange={handleLocationChange}
            name={currentWeather?.name}
          />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center w-full h-96 lg:w-1/3 bg-gradient-to-br from-cyan-500 to-sky-500 lg:h-full rounded'>
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
      <div className=' w-full lg:w-2/3 flex flex-col px-2 h-full'>
        <div className='hidden lg:flex flex-col lg:flex-row justify-start items-start  lg:justify-between lg:items-center'>
          <div>
            <Search
              setSearch={setSearch}
              setCachedLocations={setCachedLocations}
              cachedLocations={cachedLocations}
            />
          </div>

          <div className='mt-5 lg:mt-0'>
            <DropDown
              search={search}
              locations={cachedLocations}
              handleLocationChange={handleLocationChange}
              name={currentWeather?.name}
            />
          </div>
        </div>

        <Daysforecast
          nextFiveDays={weatherData}
          search={search}
          daysForecast={daysForecast}
          daysForecastBySearch={daysForecastBySearch}
        />
      </div>
    </div>
  )
}

export default Weather

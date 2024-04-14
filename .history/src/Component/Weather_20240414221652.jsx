import React, { useEffect, useState } from 'react'
import Search from './Search'
import DropDown from './DropDown'
import {
  useGet5DayForecastByCoordsQuery,
  useGet5DayForecastQuery,
  useGetCurrentWeatherQuery,
  useGetWeatherQuery,
} from '../api/api'
import getWeatherIcon from './WeatherIcons'
import DayOfWeek from './DayOfWeek'

function Weather() {
  const [search, setSearch] = useState('')
  const [cachedLocations, setCachedLocations] = useState([])
  const [currentLocation, setCurrentLocation] = useState({
    lat: 10,
    lon: 10,
  })

  const {
    data: currentWeather,
    isLoading: currentWeatherLoading,
    error: currentWeatherError,
    refetch: refetchCurrentWeather,
  } = useGetCurrentWeatherQuery(currentLocation)

  // Fetch current weather for the specified location
  const {
    data: locationWeather,
    isLoading: locationWeatherLoading,
    isError: locationWeatherError,
    error: locationWeatherError,
  } = useGetWeatherQuery(search)

  // Fetch 5-day forecast for the specified location
  const {
    data: daysForecastBySearch,
    isLoading: forecastSearchLoading,
    isError: forecastSearchError,
    error: forecastSearchError,
  } = useGet5DayForecastQuery(search ? search : null)

  // Fetch 5-day forecast for the current location
  const {
    data: daysForecast,
    isLoading: currentForecastLoading,
    isError: currentForecastError,
    error: currentForecastError,
  } = useGet5DayForecastByCoordsQuery(currentLocation)

  // Filter next five days
  const nextFiveDays = (
    search ? daysForecastBySearch : daysForecast
  )?.list?.filter((item, index) => index < 5)

  // Fetch current location and set cached locations on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current geolocation
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

        // Retrieve cached locations from local storage
        const cachedLocationsData = localStorage.getItem('cachedLocations')
        if (cachedLocationsData) {
          setCachedLocations(JSON.parse(cachedLocationsData))
        }
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchData()
  }, [])

  // Handle location change from dropdown
  const handleLocationChange = (location) => {
    setSearch(location)
  }

  if (
    currentWeatherLoading ||
    locationWeatherLoading ||
    forecastSearchLoading ||
    currentForecastLoading
  ) {
    return (
      <div className='flex justify-center items-center h-3/4 w-3/4 '>
        <p>Loading...</p>
      </div>
    )
  }

  if (
    currentWeatherError ||
    locationWeatherError ||
    forecastSearchError ||
    currentForecastError
  ) {
    return (
      <div className='flex justify-center items-center h-3/4 w-3/4 '>
        <p>Something went wrong...</p>
      </div>
    )
  }

  return (
    <div className='flex justify-between items-center bg-slate-100 w-3/4 h-3/4 rounded-sm shadow p-5'>
      {/* Current weather */}
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

      {/* Search and dropdown */}
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

        {/* Next five days forecast */}
        <div className='flex justify-between items-center'>
          {nextFiveDays?.map((day, index) => (
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
                <p>{day?.main?.humidity}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Weather

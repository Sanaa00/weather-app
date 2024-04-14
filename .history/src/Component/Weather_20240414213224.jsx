import React, { useEffect, useState } from 'react'
import Search from './Search'
import DropDown from './DropDown'
import {
  useGet5DayForecastByCoordsQuery,
  useGetCurrentWeatherQuery,
  useGetWeatherQuery,
} from '../api/api'
import getWeatherIcon from './WeatherIcons'
import DayOfWeek from './DayOfWeek'

function Weather() {
  const [search, setSearch] = useState('')
  const [cachedLocations, setCachedLocations] = useState([])
  const [currentLocation, setCurrentLocation] = useState(null)

  // Fetch current weather
  const { data: currentWeather, refetch: refetchCurrentWeather } =
    useGetCurrentWeatherQuery(currentLocation)

  // Fetch weather for searched location
  const {
    data: locationWeather,
    isLoading: locationLoading,
    isError: locationIsError,
  } = useGetWeatherQuery(search)

  // Fetch 5-day forecast for searched location
  const { data: daysForecastBySearch } =
    useGet5DayForecastByCoordsQuery(currentLocation)

  // Update cached locations when a new location is searched
  useEffect(() => {
    if (search && !cachedLocations.includes(search)) {
      setCachedLocations((prevLocations) => [...prevLocations, search])
      localStorage.setItem(
        'cachedLocations',
        JSON.stringify([...cachedLocations, search])
      )
    }
  }, [search, cachedLocations])

  // Handle location change from dropdown
  const handleLocationChange = (location) => {
    setSearch(location)
  }

  // Fetch user's current location on component mount
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

    // Retrieve cached locations from local storage
    const cachedLocationsData = localStorage.getItem('cachedLocations')
    if (cachedLocationsData) {
      setCachedLocations(JSON.parse(cachedLocationsData))
    }

    fetchData()
  }, [])

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
          <Search setSearch={setSearch} />
          <div>
            <DropDown
              locations={cachedLocations}
              handleLocationChange={handleLocationChange}
              name={(search ? locationWeather : currentWeather)?.name}
            />
          </div>
        </div>
        <div className='flex justify-between items-center'>
          {daysForecastBySearch?.list?.slice(0, 5).map((day, index) => (
            <div
              key={index}
              className='flex flex-col justify-center items-center mt-20'
            >
              <DayOfWeek timestamp={day?.dt} />
              <div className='mt-10'>
                {getWeatherIcon(day, 'text-sky-500', 'h-10', 'w-10')}
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

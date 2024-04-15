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
    const fetchCachedLocations = () => {
      const cachedLocationsData = localStorage.getItem('cachedLocations')
      if (cachedLocationsData) {
        setCachedLocations(JSON.parse(cachedLocationsData))
      }
    }

    fetchCachedLocations()
  }, [])

  useEffect(() => {
    localStorage.setItem('cachedLocations', JSON.stringify(cachedLocations))
  }, [cachedLocations])

  const handleLocationChange = (location) => {
    setSearch(location)
    setCachedLocations((prevLocations) => {
      const updatedLocations = [...prevLocations, location]
      localStorage.setItem('cachedLocations', JSON.stringify(updatedLocations))
      return updatedLocations
    })
  }
  useEffect(() => {
    console.log('currentForcastIsLoading:', currentForcastIsLoading)
    console.log('forecastSearchIsLoading:', forecastSearchIsLoading)
    console.log('locationLoading:', locationLoading)
    console.log('currentweatherLodaing:', currentweatherLodaing)
    console.log('currentLocation:', currentLocation)
  }, [
    currentForcastIsLoading,
    forecastSearchIsLoading,
    locationLoading,
    currentweatherLodaing,
    currentLocation,
  ])
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
  if (
    locationError &&
    locationIsError &&
    currentWeatherError &&
    currentWeatherError
  ) {
    console.log('Location error:', locationError)
    console.log('Weather error:', currentWeatherError)
    return (
      <div className='flex justify-center items-center h-3/4 w-3/4 '>
        <p>
          {locationError?.message}
          {currentWeatherError?.message}
        </p>
      </div>
    )
  }

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

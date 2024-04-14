import { useEffect, useState } from 'react'
import Search from './Search'
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
  const [currentLocation, setCurrentLocation] = useState({
    lat: 10,
    lon: 10,
  })
  const {
    data: currentWeather,
    error,
    refetch,
    isLoading,
    isError,
  } = useGetCurrentWeatherQuery(currentLocation)
  const {
    data: locationWeather,
    isLoading: locationLoading,
    isError: locationIsError,
    error: locationError,
  } = useGetWeatherQuery(search)
  const {
    data: daysForecastBySearch,
    isError: forcastSearchIsError,
    error: forcastSearchError,
    isLoading: forcastSearchIsLoading,
  } = useGet5DayForecastQuery(search)
  console.log('current', currentWeather)
  console.log('search', locationWeather)
  console.log('searchforecast', daysForecastBySearch)
  const { data: daysForecast } =
    useGet5DayForecastByCoordsQuery(currentLocation)
  console.log('daysForecast', daysForecast)
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

    fetchData()
  }, [])

  useEffect(() => {
    if (currentLocation) {
      refetch(currentLocation)
    }
  }, [currentLocation, refetch])

  //   useEffect(() => {
  //     if (!location.trim()) {
  //       setCurrentLocation(null)
  //     }
  //   }, [])

  return (
    <div className='flex justify-between items-center bg-slate-100 w-2/4 h-3/4 rounded-sm shadow p-5'>
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
        </div>{' '}
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
          <div>dropdown</div>
        </div>
        <div className='flex justify-between items-center'>
          {(search ? daysForecastBySearch : daysForecast)?.list
            ?.slice(1, 6)
            ?.map((day, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col justify-center items-center mt-20'
                >
                  {/* <p className='text-sm text-neutral-400'>Friday</p> */}
                  {/* <DayOfWeek
                    timestamp={
                      (search ? daysForecastBySearch : daysForecast)?.city
                        ?.coord?.timezone
                    }
                  /> */}
                  <DayOfWeek timezone={day?.dt} />
                  <div className='mt-10'>
                    {getWeatherIcon(
                      (search ? daysForecastBySearch : daysForecast)?.list[
                        index
                      ],
                      'text-sky-500',
                      'h-10',
                      'w-10'
                    )}
                  </div>

                  <p className='text-lg text-neutral-400 mt-10'>
                    {day?.main?.temp}°C
                  </p>
                  <div className='text-neutral-400 flex justify-center items-center flex-col mt-10 text-xs'>
                    <p>
                      {
                        (search ? daysForecastBySearch : daysForecast)?.wind
                          ?.speed
                      }{' '}
                      km/h
                    </p>
                    <p> {day?.main?.humidity}%</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Weather

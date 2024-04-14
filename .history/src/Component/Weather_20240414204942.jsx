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
import DayOfWeek from './DayOfWeek'

function Weather() {
  const [search, setSearch] = useState('')
  const [cachedLocations, setCachedLocations] = useState([])
  const [currentLocation, setCurrentLocation] = useState({
    lat: 10,
    lon: 10,
  })

  const handleLocationChange = (location) => {
    setSearch(location)
    // Store selected location in local storage
    localStorage.setItem('selectedLocation', location)
  }

  useEffect(() => {
    // Retrieve cached locations from local storage
    const cachedLocationsData = localStorage.getItem('cachedLocations')
    if (cachedLocationsData) {
      setCachedLocations(JSON.parse(cachedLocationsData))
    }
  }, [])

  useEffect(() => {
    // Retrieve last chosen location from browser cache storage
    const selectedLocation = localStorage.getItem('selectedLocation')
    if (selectedLocation) {
      setSearch(selectedLocation)
    }
  }, [])

  // Fetch weather data based on the selected location
  const { data: locationWeather } = useGetWeatherQuery(search)

  // Other weather fetching logic...

  return (
    <div className='flex justify-between items-center bg-slate-100 w-2/4 h-3/4 rounded-sm shadow p-5'>
      <div className='flex flex-col justify-center items-center w-1/3 bg-gradient-to-br from-cyan-500 to-sky-500 h-full rounded'>
        {/* Weather display */}
      </div>
      <div className='w-2/3 flex flex-col px-2 h-full'>
        <div className='flex justify-between items-center'>
          <Search setSearch={setSearch} />
          <div>
            <DropDown
              handleLocationChange={handleLocationChange}
              search={search}
              cachedLocations={cachedLocations}
            />
          </div>
        </div>
        <div className='flex justify-between items-center'>
          {/* Forecast display */}
        </div>
      </div>
    </div>
  )
}

export default Weather

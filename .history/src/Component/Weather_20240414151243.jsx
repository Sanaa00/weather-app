import { useState } from 'react'
import Search from './Search'
import { useGetCurrentWeatherQuery, useGetWeatherQuery } from '../api/api'
import getWeatherIcon from './WeatherIcons'

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
  //   const {
  //     data: locationWeather,
  //     isLoading: locationLoading,
  //     isError: locationIsError,
  //     error: locationError,
  //   } = useGetWeatherQuery(search)
  console.log('current', currentWeather)
  //   console.log('search', locationWeather)

  return (
    <div className='flex justify-between items-center bg-slate-100 w-2/4 h-3/4 rounded-sm shadow p-5'>
      <div className='flex flex-col justify-center items-center w-1/3 bg-gradient-to-br from-cyan-500 to-sky-500 h-full rounded'>
        {getWeatherIcon(currentWeather)}
        <p className='mt-10 text-3xl text-slate-100'>
          {currentWeather?.main?.temp}°C
        </p>
        <div className='flex flex-col justify-center items-center mt-10 text-slate-100 text-sm'>
          <p>Today</p>
          <p>{currentWeather?.name}</p>
        </div>{' '}
        <div className='flex flex-col justify-center items-center mt-10 text-slate-100 text-sm'>
          <p>{currentWeather?.main?.humidity}%</p>
          <p>wind:20</p>
        </div>
      </div>
      <div className='w-2/3 flex flex-col px-2 h-full'>
        <div className='flex justify-between items-center'>
          <Search setSearch={setSearch} />
          <div>dropdown</div>
        </div>
        <div>
          <div className='flex flex-col justify-center items-center mt-20'>
            <p className='text-sm text-neutral-400'>Friday</p>
            <img alt='icon' src='' className='mt-10' />
            <p className='text-3xl text-neutral-400 mt-10'>30F</p>
            <div className='flex justify-center items-center flex-col mt-10'>
              <p className='text-sm text-neutral-400'>30F</p>
              <p className='text-sm text-neutral-400'>30%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
// import { FiSun } from 'react-icons/fi'
// import { FiCloud } from 'react-icons/fi'
// import { IoThunderstormOutline } from 'react-icons/io5'
// import { IoRainyOutline } from 'react-icons/io5'
// import { LiaCloudRainSolid } from "react-icons/lia";
// import { FiCloudSnow } from "react-icons/fi";
// import { PiCloudFog } from "react-icons/pi";
// import { RiMistFill } from "react-icons/ri";
// <FiSun />
// <FiCloud />
//  <IoThunderstormOutline />
// <IoRainyOutline />
// <LiaCloudRainSolid />
// <FiCloudSnow />
// <PiCloudFog />
// <RiMistFill />

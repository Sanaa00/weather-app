import React from 'react'
import {
  FaSun,
  FaCloud,
  FaCloudShowersHeavy,
  FaCloudRain,
  FaSnowflake,
  FaBolt,
  //   FaCloudFog,
} from 'react-icons/fa'
import { LuCloudFog } from 'react-icons/lu'
function getWeatherIconUrl(weatherData) {
  const iconCode = weatherData?.weather[0]?.icon
  const iconMap = {
    '01d': FaSun,
    '01n': FaSun,
    '02d': FaCloud,
    '02n': FaCloud,
    '03d': FaCloud,
    '03n': FaCloud,
    '04d': FaCloud,
    '04n': FaCloud,
    '09d': FaCloudShowersHeavy,
    '09n': FaCloudShowersHeavy,
    '10d': FaCloudRain,
    '10n': FaCloudRain,
    '11d': FaCloudShowersHeavy,
    '11n': FaCloudShowersHeavy,
    '13d': FaSnowflake,
    '13n': FaSnowflake,
    '50d': LuCloudFog,
    '50n': LuCloudFog,
  }

  const IconComponent = iconMap[iconCode] || FaSun // Default to Sun icon if no match found

  return <IconComponent className='w-16 h-16 text-slate-100' />
}

export default getWeatherIconUrl

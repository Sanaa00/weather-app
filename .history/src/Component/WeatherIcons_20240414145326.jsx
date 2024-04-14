import React from 'react'
import {
  FaSun,
  FaCloud,
  FaCloudShowersHeavy,
  FaCloudRain,
  FaSnowflake,
  FaCloudFog,
} from 'react-icons/fa'
import { FaCloudFog } from 'react-icons/fa'
function getWeatherIcon(weatherData) {
  const iconCode = weatherData?.weather[0]?.icon
  const weatherIconMap = {
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
    '50d': FaCloudFog,
    '50n': FaCloudFog,
  }

  const IconComponent = weatherIconMap[iconCode] || FaSun // Default to Sun icon if no match found
  return <IconComponent />
}

export default getWeatherIcon

/* eslint-disable react/prop-types */

import DayOfWeek from './DayOfWeek'
import getWeatherIcon from './WeatherIcons'
function Daysforecast({
  nextFiveDays,
  search,
  daysForecast,
  daysForecastBySearch,
}) {
  return (
    <div className='flex justify-between items-center'>
      {nextFiveDays?.map((day, index) => {
        return (
          <div
            key={index}
            className='flex flex-col justify-center items-center mt-5 lg:mt-20'
          >
            <DayOfWeek timestamp={day?.dt} />
            <div className=' mt-10'>
              {getWeatherIcon(
                (search ? daysForecastBySearch : daysForecast)?.list[index],
                'text-sky-500',
                'h-10',
                'w-10'
              )}
            </div>

            <p className=' text-sm lg:text-lg text-neutral-400 mt-10'>
              {day?.main?.temp}°C
            </p>
            <div className='text-neutral-400 flex justify-center items-center flex-col mt-10 text-xs'>
              <p>{day?.wind?.speed} km/h</p>
              <p> {day?.main?.humidity}%</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Daysforecast

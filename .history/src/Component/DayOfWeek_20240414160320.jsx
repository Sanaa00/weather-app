import React from 'react'

function DayOfWeek({ timezone }) {
  const now = new Date().toLocaleString('en-US', { timeZone: timezone }) // Get the current date and time in the specified timezone
  const options = { weekday: 'long' } // Specify that you want the full name of the day
  const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(
    new Date(now)
  ) // Get the day of the week name

  return (
    <div>
      {/* Display the day of the week */}
      <p>Current Day: {dayOfWeek}</p>
    </div>
  )
}

export default DayOfWeek

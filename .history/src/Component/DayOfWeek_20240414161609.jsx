import React from 'react'

function DayOfWeek({ timestamp }) {
  const date = new Date(timestamp * 1000) // Convert Unix timestamp to milliseconds
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }) // Get the full name of the day of the week

  return (
    <div>
      {/* Display the day of the week */}
      <p> {dayOfWeek}</p>
    </div>
  )
}

export default DayOfWeek

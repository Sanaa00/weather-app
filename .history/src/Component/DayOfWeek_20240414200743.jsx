// eslint-disable-next-line react/prop-types
function DayOfWeek({ timestamp }) {
  console.log('Timestamp:', timestamp) // Log the timestamp to check its value

  const date = new Date(timestamp * 1000) // Convert Unix timestamp to milliseconds
  console.log('Date:', date) // Log the date object to check its value

  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }) // Get the full name of the day of the week
  console.log('Day of the Week:', dayOfWeek) // Log the day of the week to check its value

  return (
    <div>
      {/* Display the day of the week */}
      <p>{dayOfWeek}</p>
    </div>
  )
}

export default DayOfWeek

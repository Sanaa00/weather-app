import { format } from 'date-fns'

function DayOfWeek({ timestamp }) {
  const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000) // Convert Unix timestamp to milliseconds
    return format(date, 'dddd') // Get the full name of the day of the week
  }

  return (
    <div>
      {/* Display the day of the week name */}
      {getDayOfWeek(timestamp)}
    </div>
  )
}

export default DayOfWeek

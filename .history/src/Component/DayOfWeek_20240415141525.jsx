// eslint-disable-next-line react/prop-types
function DayOfWeek({ timestamp }) {
  console.log('Timestamp:', timestamp)

  const date = new Date(timestamp * 1000)
  console.log('Date:', date)

  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  console.log('Day of the Week:', dayOfWeek)

  return (
    <div>
      <p className='text-neutral-400 '>{dayOfWeek}</p>
    </div>
  )
}

export default DayOfWeek

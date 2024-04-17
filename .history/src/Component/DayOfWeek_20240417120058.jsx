// eslint-disable-next-line react/prop-types
function DayOfWeek({ timestamp }) {
  const date = new Date(timestamp * 1000)
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  return (
    <div>
      <p className='text-neutral-400 text-sm lg:text-md'>{dayOfWeek}</p>
    </div>
  )
}

export default DayOfWeek

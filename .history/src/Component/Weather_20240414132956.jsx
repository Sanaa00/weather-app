function Weather() {
  return (
    <div className='flex justify-between items-center bg-slate-100 w-2/4 h-3/4 rounded-sm shadow p-5'>
      <div className='flex flex-col justify-center items-center w-1/3 bg-gradient-to-br from-cyan-500 to-sky-500 h-full rounded'>
        <img alt='icon' src='' />
        <p className='mt-10 text-xl text-slate-100'>31F</p>
        <div className='flex flex-col justify-center items-center mt-10'>
          <p>Today</p>
          <p>City name</p>
        </div>{' '}
        <div className='flex flex-col justify-center items-center mt-10'>
          <p>Humidity: 30</p>
          <p>wind:20</p>
        </div>
      </div>
      <div className='w-2/3 flex'>detail here</div>
    </div>
  )
}

export default Weather

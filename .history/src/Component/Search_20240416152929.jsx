import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'

function Search({ setSearch, setCachedLocations, cachedLocations }) {
  const [value, setValue] = useState('')

  const searchHandler = () => {
    setSearch(value)
    if (value.trim() !== '') {
      const updatedCachedLocations = [...cachedLocations, value]
      setCachedLocations(updatedCachedLocations)
      localStorage.setItem(
        'cachedCities',
        JSON.stringify(updatedCachedLocations)
      )
    }
  }

  useEffect(() => {
    const fetchCachedLocations = () => {
      const cachedLocations = localStorage.getItem('cachedCities')
      if (cachedLocations) {
        setCachedLocations(JSON.parse(cachedLocations))
      }
    }

    fetchCachedLocations()
  }, [setCachedLocations])

  return (
    <div className='flex w-full'>
      <input
        placeholder='Search'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='rounded p-2 w-60 h-8 bg-slate-100 border-2 border-slate-200 hover:border-sky-500 focus:bg-slate-100  focus:border-sky-500 focus:outline-none hover:outline-none hover:duration-300 focus:duration-300 duration-300'
      />
      <button
        onClick={() => searchHandler()}
        className='flex justify-center items-center duration-300 hover:duration-300 w-8 h-8 bg-slate-200 rounded-full ml-2 '
      >
        <CiSearch className='w-6 h-6 hover:text-sky-500 duration-300 hover:duration-300' />
      </button>
    </div>
  )
}

export default Search

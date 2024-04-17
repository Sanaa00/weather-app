// Search.js
import React, { useEffect, useState } from 'react'
import Autocomplete from './Autocomplete'
import { CiSearch } from 'react-icons/ci'

function Search({ setSearch, setCachedLocations, cachedLocations }) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

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
    // Clear suggestions after search
    setSuggestions([])
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

  const handleChange = (e) => {
    const inputValue = e.target.value
    setValue(inputValue)
    // Filter suggestions based on input value
    const filteredSuggestions = cachedLocations.filter((location) =>
      location.toLowerCase().includes(inputValue.toLowerCase())
    )
    setSuggestions(filteredSuggestions)
  }

  const handleSelectSuggestion = (suggestion) => {
    setValue(suggestion)
    setSearch(suggestion)
    setSuggestions([])
  }

  return (
    <div className='flex flex-col w-full relative'>
      <input
        placeholder='Search'
        value={value}
        onChange={handleChange}
        className='rounded p-2 w-60 h-8 bg-slate-100 border-2 border-slate-200 hover:border-sky-500 focus:bg-slate-100 focus:border-sky-500 focus:outline-none hover:outline-none hover:duration-300 focus:duration-300 duration-300'
      />
      {suggestions.length > 0 && (
        <Autocomplete
          suggestions={suggestions}
          handleClick={handleSelectSuggestion}
        />
      )}
      <button
        onClick={searchHandler}
        className='flex justify-center items-center duration-300 hover:duration-300 w-8 h-8 bg-slate-200 rounded-full ml-2'
      >
        <CiSearch className='w-6 h-6 hover:text-sky-500 duration-300 hover:duration-300' />
      </button>
    </div>
  )
}

export default Search

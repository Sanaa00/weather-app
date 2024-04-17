import React, { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useGetCitySuggestionsQuery } from '../api/api'

function Search({ setSearch, setCachedLocations, cachedLocations }) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const { data: citySuggestions = [] } = useGetCitySuggestionsQuery(value)
  console.log(citySuggestions)
  // Debounce input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.trim() !== '') {
        setSuggestions(
          citySuggestions?.list.map((suggestion) => suggestion.name)
        )
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [value, citySuggestions])

  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
  }

  const handleSearch = () => {
    setSearch(value)
    if (value.trim() !== '') {
      // Update cached locations and store in localStorage
      const updatedCachedLocations = [...cachedLocations, value]
      setCachedLocations(updatedCachedLocations)
      localStorage.setItem(
        'cachedCities',
        JSON.stringify(updatedCachedLocations)
      )
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion)
    setSearch(suggestion)
    setSuggestions([]) // Clear suggestions after selecting one
  }

  return (
    <div className='flex flex-col lg:flex-row w-full relative'>
      <div>
        {' '}
        <input
          placeholder='Search'
          value={value}
          onChange={handleChange}
          className='rounded p-2 w-60 h-8 bg-slate-100 border-2 border-slate-200 hover:border-sky-500 focus:bg-slate-100 focus:border-sky-500 focus:outline-none hover:outline-none hover:duration-300 focus:duration-300 duration-300'
        />
        {suggestions.length > 0 && (
          <div className='absolute bg-slate-100 border border-gray-200 rounded mt-1 w-60'>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className='p-1 hover:bg-slate-100 cursor-pointer'
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSearch}
        className='flex justify-center items-center duration-300 hover:duration-300 w-8 h-8 bg-slate-200 rounded-full ml-2'
      >
        <CiSearch className='w-6 h-6 hover:text-sky-500 duration-300 hover:duration-300' />
      </button>
    </div>
  )
}

export default Search

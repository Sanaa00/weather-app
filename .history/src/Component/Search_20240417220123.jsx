import { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useGetCitySuggestionsQuery } from '../api/api'

function Search({ setSearch, setCachedLocations, cachedLocations }) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // State to manage dropdown visibility
  const { data: citySuggestions = [] } = useGetCitySuggestionsQuery(value, {
    skip: !value,
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.trim() !== '') {
        setSuggestions(
          citySuggestions?.list.map((suggestion) => suggestion.name)
        )
        setIsDropdownOpen(true) // Open dropdown when suggestions are available
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
      updateCachedLocations(value)
    }
    setIsDropdownOpen(false) // Close dropdown after search
  }

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion)
    setSearch(suggestion)
    updateCachedLocations(suggestion)
    setIsDropdownOpen(false) // Close dropdown after suggestion click
  }

  const updateCachedLocations = (location) => {
    const updatedCachedLocations = [...new Set([...cachedLocations, location])]
    setCachedLocations(updatedCachedLocations)
    localStorage.setItem('cachedCities', JSON.stringify(updatedCachedLocations))
  }

  return (
    <div className='flex  lg:flex-row w-full relative'>
      <div>
        {' '}
        <input
          placeholder='Search'
          value={value}
          onChange={handleChange}
          className='rounded p-2 w-60 h-8 bg-slate-100 border-2 border-slate-200 hover:border-sky-500 focus:bg-slate-100 focus:border-sky-500 focus:outline-none hover:outline-none hover:duration-300 focus:duration-300 duration-300'
        />
        {isDropdownOpen && suggestions.length > 0 && (
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

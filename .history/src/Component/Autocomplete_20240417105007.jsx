// Autocomplete.js
import React from 'react'

const Autocomplete = ({ suggestions, handleClick }) => {
  return (
    <ul className='autocomplete'>
      {suggestions.map((suggestion, index) => (
        <li key={index} onClick={() => handleClick(suggestion)}>
          {suggestion}
        </li>
      ))}
    </ul>
  )
}

export default Autocomplete

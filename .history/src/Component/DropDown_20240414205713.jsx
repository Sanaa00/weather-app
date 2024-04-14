import React from 'react'

const DropDown = ({ locations, handleLocationChange }) => {
  return (
    <select onChange={(e) => handleLocationChange(e.target.value)}>
      <option value=''>Current</option>
      {locations.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
      ))}
    </select>
  )
}

export default DropDown

import { MdHistory } from 'react-icons/md'
import React from 'react'

export default function DropDown({
  handleLocationChange,
  search,
  cachedLocations,
}) {
  return (
    <select
      onChange={(e) => handleLocationChange(e.target.value)}
      value={search}
    >
      <option value=''>Current Location</option>
      {cachedLocations.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
      ))}
    </select>
  )
}

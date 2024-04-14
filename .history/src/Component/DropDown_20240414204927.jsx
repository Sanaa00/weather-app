import { useEffect, useState } from 'react'

export default function DropDown({ handleLocationChange, search }) {
  const [cachedLocations, setCachedLocations] = useState([])

  useEffect(() => {
    // Retrieve cached locations from local storage
    const cachedLocationsData = localStorage.getItem('cachedLocations')
    if (cachedLocationsData) {
      setCachedLocations(JSON.parse(cachedLocationsData))
    }
  }, [])

  const handleChange = (e) => {
    const selectedLocation = e.target.value
    handleLocationChange(selectedLocation)
  }

  return (
    <select value={search} onChange={handleChange}>
      <option value=''>Current Location</option>
      {cachedLocations.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
      ))}
    </select>
  )
}

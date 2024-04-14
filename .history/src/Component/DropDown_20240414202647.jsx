import { MdHistory } from 'react-icons/md'
;<select onChange={(e) => handleLocationChange(e.target.value)} value={search}>
  <option value=''>Current Location</option>
  {cachedLocations.map((location, index) => (
    <option key={index} value={location}>
      {location}
    </option>
  ))}
</select>

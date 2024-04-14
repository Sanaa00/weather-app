import { MdHistory } from 'react-icons/md'

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
      <option value=''>Current</option>
      {cachedLocations?.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
      ))}
    </select>
  )
}

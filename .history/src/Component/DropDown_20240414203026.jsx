/* eslint-disable react/prop-types */
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
      <option value=''>
        <MdHistory />
      </option>
      {cachedLocations?.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
      ))}
    </select>
  )
}

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
      className='w-full'
    >
      <option value=''>
        <MdHistory className='w-6 h-6 hover:text-sky-500 duration-300 hover:duration-300' />
      </option>
      {cachedLocations?.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
      ))}
    </select>
  )
}

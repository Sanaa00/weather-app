/* eslint-disable react/prop-types */

const DropDown = ({ locations, handleLocationChange, name }) => {
  return (
    <select
      className='bg-slate-200 rounded p-2'
      onChange={(e) => handleLocationChange(e.target.value)}
    >
      <option value=''>{name}</option>
      {locations.map((location, index) => (
        <option
          key={index}
          value={location}
          className='bg-white border-b border-gray-200'
        >
          {location}
        </option>
      ))}
    </select>
  )
}

export default DropDown

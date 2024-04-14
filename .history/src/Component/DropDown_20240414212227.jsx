const DropDown = ({ locations, handleLocationChange, name }) => {
  return (
    <select
      onChange={(e) => handleLocationChange(e.target.value)}
      className='bg-slate-200 rounded'
    >
      <option value=''>{name}</option>
      {locations.map((location, index) => (
        <option
          key={index}
          value={location}
          className='bg-white border-b border-gray-200 hover:bg-gray-100'
        >
          {location}
        </option>
      ))}
    </select>
  )
}

export default DropDown

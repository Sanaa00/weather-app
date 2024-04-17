const DropDown = ({ locations, handleLocationChange, name }) => {
  // Filter out duplicate locations
  const uniqueLocations = [...new Set(locations)]

  return (
    <select
      onChange={(e) => handleLocationChange(e.target.value)}
      className='bg-slate-200 rounded appearance-none py-1 px-4'
    >
      <option value={''}>{name}</option>
      {uniqueLocations.map((location, index) => (
        <option
          key={index}
          value={location}
          className='py-1 pl-3 pr-10 cursor-pointer bg-slate-200'
        >
          {location}
        </option>
      ))}
    </select>
  )
}

export default DropDown

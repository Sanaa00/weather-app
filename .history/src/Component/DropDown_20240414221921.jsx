const DropDown = ({ locations, handleLocationChange, name }) => {
  return (
    <select
      onChange={(e) => handleLocationChange(e.target.value)}
      className='bg-slate-200 rounded appearance-none border border-gray-300 py-2 pl-3 pr-10'
    >
      <option value=''>{name}</option>
      {locations?.map((location, index) => (
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

/* eslint-disable react/prop-types */

const DropDown = ({ locations, handleLocationChange, name }) => {
  return (
    <select onChange={(e) => handleLocationChange(e.target.value)}>
      <option value=''>{name}</option>
      {locations.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
      ))}
    </select>
  )
}

export default DropDown

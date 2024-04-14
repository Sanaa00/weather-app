import { useState } from 'react'

function Search() {
  const [value, setValue] = useState('')
  return (
    <div>
      <input
        placeholder='Search'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={()}>search</button>
    </div>
  )
}

export default Search

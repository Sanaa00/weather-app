import { useState } from 'react'

function Search({ setSearch }) {
  const [value, setValue] = useState('')
  return (
    <div>
      <input
        placeholder='Search'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => setSearch(value)}>search</button>
    </div>
  )
}

export default Search

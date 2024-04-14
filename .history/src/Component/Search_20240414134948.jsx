import { useState } from 'react'

function Search({ setSearch }) {
  const [value, setValue] = useState('')
  return (
    <div>
      <input
        placeholder='Search'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='rounded p-1 w-60 h-10  bg-slate-200 active:border active:border-blue-400'
      />
      <button onClick={() => setSearch(value)}>search</button>
    </div>
  )
}

export default Search

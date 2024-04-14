import { useState } from 'react'

function Search({ setSearch }) {
  const [value, setValue] = useState('')
  return (
    <div>
      <input
        placeholder='Search'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='rounded p-1 w-60 h-8  bg-slate-200 border-2 hover:border-2 hover:border-sky-500 active:border-sky-500 focus:outline-none hover:outline-none'
      />
      <button onClick={() => setSearch(value)}>search</button>
    </div>
  )
}

export default Search

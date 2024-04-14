import { useState } from 'react'

function Search({ setSearch }) {
  const [value, setValue] = useState('')
  return (
    <div>
      <input
        placeholder='Search'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='rounded p-2 w-60 h-8  bg-slate-200 border-2 border-slate-200  focus:border-sky-500 focus:outline-none hover:outline-none'
      />
      <button onClick={() => setSearch(value)}>search</button>
    </div>
  )
}

export default Search

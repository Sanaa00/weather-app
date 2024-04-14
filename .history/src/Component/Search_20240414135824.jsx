import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
function Search({ setSearch }) {
  const [value, setValue] = useState('')
  return (
    <div className='flex'>
      <input
        placeholder='Search'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='rounded p-2 w-60 h-8  bg-slate-200 border-2 border-slate-200  focus:border-sky-500 focus:outline-none hover:outline-none'
      />
      <button
        onClick={() => setSearch(value)}
        className='flex bg-slate-200 rounded-full'
      >
        search
      </button>
    </div>
  )
}

export default Search

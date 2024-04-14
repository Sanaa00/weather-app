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
        className='rounded p-2 w-60 h-8  bg-slate-200 border border-slate-200 focus:bg-slate-300  focus:border-sky-500 focus:outline-none hover:outline-none'
      />
      <button
        onClick={() => setSearch(value)}
        className='flex justify-center items-center duration-300 hover:duration-300 w-8 h-8 bg-slate-200 rounded-full ml-2 hover:bg-slate-300 c'
      >
        <CiSearch className='w-6 h-6 hover:text-sky-500 duration-500' />
      </button>
    </div>
  )
}

export default Search

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
        className='rounded p-2 w-60 h-8  bg-slate-100 border-2 border-slate-200 hover:border-sky-500 focus:bg-slate-100  focus:border-sky-500 focus:outline-none hover:outline-none hover:duration-300 focus:duration-300 duration-300'
      />
      <button
        onClick={() => setSearch(value)}
        className='flex justify-center items-center duration-300 hover:duration-300 w-8 h-8 bg-slate-200 rounded-full ml-2  c'
      >
        <CiSearch className='w-6 h-6 hover:text-sky-500 duration-300 hover:duration-300' />
      </button>
    </div>
  )
}

export default Search

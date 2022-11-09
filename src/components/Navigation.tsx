import { ImFileText, ImTrophy } from 'react-icons/im'
import { Link } from 'react-router-dom'

export function Navigation() {
  return (
    <nav className='flex flex-col justify-between items-center h-18 shadow-md bg-zinc-800'>
      <Link to='/' className='p-3 text-5xl font-bold text-pink-400 hover:text-pink-100'>My Todo List</Link>

      <span className='flex justify-around w-80'>
        <Link to='/' className='p-4 hover:text-pink-400 focus:text-pink-400'><ImFileText size={41} /></Link>
        <Link to='/achievements' className='p-4 hover:text-yellow-400 focus:text-yellow-400'><ImTrophy size={46}/></Link>
      </span>
    </nav>
  )
}

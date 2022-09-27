import {Link} from 'react-router-dom'

export function Navigation() {
  return (
    <nav className='flex flex-col justify-between items-center h-18 shadow-md bg-zinc-800 pb-5'>
      <Link to='/' className='p-5 font-bold text-pink-400 hover:text-pink-100'>My Todo List</Link>

      <span>
        <Link to='/' className='mr-2 p-5 decoration-pink-400 hover:underline'>All tasks</Link>
        <Link to='/achievements' className='p-5 decoration-pink-400 hover:underline'>My Achievements</Link>
      </span>
    </nav>
  )
}

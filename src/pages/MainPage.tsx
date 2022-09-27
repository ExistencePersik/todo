import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/debounce'

export function MainPage() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const debounced = useDebounce(text)

  useEffect(() => {
    console.log(debounced)
  }, [debounced])

  const addTodo = () => {

  }

  return (
    <div className='flex justify-center pt-10 mx-auto'>
      <label className='flex w-80'>
        <input
          type='text'
          className="border rounded outline-pink-400 caret-pink-400 text-zinc-900 py-2 px-4 w-full h-11 mb-2"
          placeholder="Add some task here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          className='-mr-3 w-34 h-11 bg-pink-400 rounded'
          onClick={addTodo}
        >
          Add
        </button>
      </label>
    </div>
  )
}

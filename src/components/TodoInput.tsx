import { useState } from 'react'
import { useAppDispatch } from '../hooks/reduxHooks'
import { addTodo } from '../store/reducers/TodoSlice';

export const TodoInput = () => {
  const [text, setText] = useState('')
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (text.trim().length) {
      dispatch(addTodo(text))
      setText('')
    }
  }

  return (
    <label className='flex w-80'>
        <input
          type='text'
          className="rounded outline-none caret-pink-400 text-zinc-900 py-2 px-4 w-full h-11 mb-2"
          placeholder="Add some task here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          className='-mr-3 w-34 h-11 bg-pink-400 rounded focus:bg-pink-600'
          onClick={handleAddTodo}
        >
          Add
        </button>
      </label>
  )
}

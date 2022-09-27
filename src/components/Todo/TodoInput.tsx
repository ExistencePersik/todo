import { useState } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { addTodo } from '../../store/reducers/TodoSlice'
import { RiAddBoxFill } from 'react-icons/ri'

export const TodoInput = () => {
  const [text, setText] = useState('')
  const dispatch = useAppDispatch()

  const handleAddTodo = () => {
    if (text.trim().length) {
      dispatch(addTodo(text))
      setText('')
    }
  }

  return (
    <label className='flex flex-col justify-center items-center w-80'>
        <input
          type='debounced'
          className="rounded-2xl outline-none caret-pink-400 text-zinc-900 py-2 px-4 w-full h-11 mb-5"
          placeholder="Add some task here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          className='w-11 h-11 mb-5 bg-pink-400 rounded-full hover:bg-pink-600'
          onClick={handleAddTodo}
        >
          <span className='flex flex-col items-center'><RiAddBoxFill /></span>
        </button>
      </label>
  )
}

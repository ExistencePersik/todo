import React, { useState } from 'react'
import { RiAddBoxFill } from 'react-icons/ri'
import { useAddTodoMutation } from '../../store/todosApi'
import { ITodos } from '../../models/models'

export const TodoInput = () => {
  const [text, setText] = useState('')
  const [addTodo] = useAddTodoMutation()

  const handleAddTodo = async () => {
    if (text.trim().length) {
      await addTodo({title: text, completed: false} as ITodos)
      setText('')
    }
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleAddTodo()
    }
  }

  return (
    <label className='flex flex-col justify-center items-center w-80'>
        <input
          type='text'
          className="rounded-2xl outline-none caret-pink-400 text-zinc-900 py-2 px-4 w-full h-11 mb-5"
          placeholder="Add some task here..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={keyDownHandler}
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

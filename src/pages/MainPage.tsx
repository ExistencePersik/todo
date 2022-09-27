import { useState, useEffect } from 'react'
import { TodoInput } from '../components/TodoInput'
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
      <TodoInput />
    </div>
  )
}

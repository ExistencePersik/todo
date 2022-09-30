import { useAppSelector } from '../../hooks/reduxHooks'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const todos = useAppSelector(state => state.todos.list)

  return (
    <ul className='w-80'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo}/>
      ))}
    </ul>
  )
}

import { ITodos } from '../../models/models'
import { useGetTodosQuery } from '../../store/todosApi'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const {data, isLoading, isError} = useGetTodosQuery()

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2 className='text-red-600'>Error</h2>}

      <ul className='w-80'>
        {data?.map((todo: ITodos) => (
          <TodoItem key={todo.id} {...todo}/>
          ))}
      </ul>
    </>
  )
}

import { TodoInput } from '../components/Todo/TodoInput'
import { TodoList } from '../components/Todo/TodoList'

export function MainPage() {

  return (
    <div className='flex items-center flex-col pt-5 mx-auto'>
      <TodoInput />
      <TodoList />
    </div>
  )
}

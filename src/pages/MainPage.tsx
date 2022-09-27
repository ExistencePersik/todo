import { TodoInput } from '../components/TodoInput'
import { TodoList } from '../components/TodoList'

export function MainPage() {

  return (
    <div className='flex items-center flex-col pt-5 mx-auto'>
      <TodoInput />
      <TodoList />
    </div>
  )
}

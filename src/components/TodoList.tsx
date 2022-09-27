import { useAppSelector } from "../hooks/reduxHooks"
import { TodoItem } from "./TodoItem"

export const TodoList = () => {
  const todos = useAppSelector(state => state.todos.list)

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem {...todo}/>
      ))}
    </ul>
  )
}

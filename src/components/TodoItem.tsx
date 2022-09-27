import { useAppDispatch } from '../hooks/reduxHooks'
import { ITodos } from '../models/ITodos'
import { removeTodo } from '../store/reducers/TodoSlice'
import { Check } from './icons/Check'
import cn from 'classnames'

export const TodoItem: React.FC<ITodos> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch()

  return (
    <li>
      <Check id={id} completed={completed} />
      <span className={cn({'line-through': completed})}>{title}</span>
      <span onClick={() => dispatch(removeTodo(id))}>&times;</span>
    </li>
  )
}

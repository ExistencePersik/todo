import { useAppDispatch } from '../../hooks/reduxHooks'
import { ITodos } from '../../models/models'
import { removeTodo } from '../../store/reducers/TodoSlice'
import { Check } from '../icons/Check'
import cn from 'classnames'
import { Achievement } from '../icons/Achievement'

export const TodoItem: React.FC<ITodos> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch()

  return (
    <li className='flex items-center mb-4 rounded-2xl bg-zinc-800 p-5 w-full'>
      <Check id={id} completed={completed} />
      <span className={cn({'line-through': completed})}>{title}</span>
      <Achievement title={title}/>
      <span onClick={() => dispatch(removeTodo(id))}>&times;</span>
    </li>
  )
}

import { ITodos } from '../../models/models'
import { Check } from '../icons/Check'
import cn from 'classnames'
import { Achievement } from '../icons/Achievement'
import { Bin } from '../icons/Bin'

export const TodoItem: React.FC<ITodos> = ({ id, title, completed }) => {
  return (
    <li className='flex items-center justify-around mb-4 rounded-2xl bg-zinc-800 p-5 w-full'>
      <Check id={id} completed={completed} />
      <span className={cn('w-[190px]', {'line-through': completed})}>{title}</span>
      <Achievement title={title}/>
      <Bin id={id} />
    </li>
  )
}

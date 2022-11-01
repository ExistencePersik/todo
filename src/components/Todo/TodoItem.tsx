import { ITodos } from '../../models/models'
import { Check } from '../icons/Check'
import { Achievement } from '../icons/Achievement'
import { Bin } from '../icons/Bin'
import cn from 'classnames'

export const TodoItem: React.FC<ITodos> = ({ id, title, completed, achieved }) => {
  return (
    <>
      <Check id={id} completed={completed} />
      <span className={cn('w-[190px]', {'line-through': completed})}>{title}</span>
      <Achievement id={id} title={title} achieved={achieved} />
      <Bin id={id} />
    </>
  )
}

import { ImCheckboxChecked } from 'react-icons/im'
import { ITodos } from '../../models/models'
import { useToggleTodoMutation } from '../../store/todosApi'
import cn from 'classnames'

export const Check: React.FC<Partial<ITodos>> = ({ id, completed }) => {
  const [toggleCompleted] = useToggleTodoMutation()

  const handlerToggleTodo = async () => {
    await toggleCompleted({ id, completed: !completed } as ITodos)
  }

  return (
    <button
      className={cn('border-2 rounded-lg border-pink-400 w-6 h-6 flex items-center justify-center',
        {
          'bg-pink-400': completed,
        }
      )}
      onClick={() => handlerToggleTodo()}
    >
      {completed && <ImCheckboxChecked size={24} className='text-zinc-900'/>}
    </button>
  )
}

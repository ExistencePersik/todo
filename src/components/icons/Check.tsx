import { ImCheckboxChecked } from 'react-icons/im'
import cn from 'classnames'
import { IChecked, ITodos } from '../../models/models'
import { useToggleTodoMutation } from '../../store/todosApi'

export const Check: React.FC<IChecked> = ({ completed, id }) => {
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

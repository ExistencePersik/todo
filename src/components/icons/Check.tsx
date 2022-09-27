import { ImCheckboxChecked } from 'react-icons/im'
import cn from 'classnames'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { toggleComplete } from '../../store/reducers/TodoSlice'
import { IChecked } from '../../models/models'

export const Check: React.FC<IChecked> = ({ completed, id }) => {
  const dispatch = useAppDispatch()

  return (
    <button
      className={cn('border-2 rounded-lg border-pink-400 w-6 h-6 mr-3 flex items-center justify-center',
        {
          'bg-pink-400': completed,
        }
      )}
      onClick={() => dispatch(toggleComplete(id))}
    >
      {completed && <ImCheckboxChecked size={24} className='text-zinc-900'/>}
    </button>
  )
}

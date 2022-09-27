import { ImBin } from 'react-icons/im'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { removeTodo } from '../../store/reducers/TodoSlice'
import { IRemoved } from '../../models/models'

export const Bin: React.FC<IRemoved> = ({ id }) => {
  const dispatch = useAppDispatch()

  return (
    <button onClick={() => dispatch(removeTodo(id))}>
      <ImBin size={24} className='text-zinc-400 hover:text-zinc-50'/>
    </button>
  )
}

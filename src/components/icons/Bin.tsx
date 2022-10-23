import { ImBin } from 'react-icons/im'
import { ITodos } from '../../models/models'
import { useRemoveTodoMutation } from '../../store/todosApi'

export const Bin: React.FC<Partial<ITodos>> = (id) => {
  const [removeTodo] = useRemoveTodoMutation()

  return (
    <button onClick={() => removeTodo(id)}>
      <ImBin size={24} className='text-zinc-400 hover:text-zinc-50'/>
    </button>
  )
}

import { ImBin } from 'react-icons/im'
import { ITodos } from '../../models/models'
import { useRemoveTodosMutation } from '../../store/todosApi'

export const Bin: React.FC<ITodos> = (id) => {
  const [removeTodo] = useRemoveTodosMutation()

  const handleRemoveTodo = async (id: ITodos) => {
    await removeTodo(id)
  }

  return (
    <button onClick={() => handleRemoveTodo(id)}>
      <ImBin size={24} className='text-zinc-400 hover:text-zinc-50'/>
    </button>
  )
}

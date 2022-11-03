import { ImCheckboxChecked, ImHeart, ImBin } from 'react-icons/im'
import { ITodos } from '../../models/models'
import { useRemoveTodoMutation, useToggleTodoMutation, useToggleAchievementMutation } from '../../store/todosApi'
import cn from 'classnames'

export const TodoItem: React.FC<ITodos> = (todo) => {
  const [removeTodo] = useRemoveTodoMutation()
  const [toggleCompleted] = useToggleTodoMutation()
  const [toggleAchieved] = useToggleAchievementMutation()

  const handleRemoveTodo = async (todo: ITodos) => {
    await removeTodo(todo)
  }

  const handlerToggleTodo = async () => {
    await toggleCompleted({
      ...todo,
      completed: !todo.completed
    })
  }

  const handlerToggleAchieve = async () => {
    await toggleAchieved({
      ...todo,
      achieved: !todo.achieved
    })
  }

  return (
    <>
      <button
        className={cn('border-2 rounded-md border-pink-400 w-6 h-6 flex items-center justify-center',
          {
            'bg-pink-400': todo.completed,
          }
        )}
        onClick={() => handlerToggleTodo()}
      >
        {todo.completed && <ImCheckboxChecked size={20} className='text-zinc-900'/>}
      </button>
      <span className={cn('w-[190px]', {'line-through': todo.completed})}>{todo.title}</span>
      <button
        onClick={() => handlerToggleAchieve()}
      >
        {todo.achieved
          ? <ImHeart color='red'/>
          : <ImHeart color='white'/>
        }
      </button>
      <button onClick={() => handleRemoveTodo(todo)}>
        <ImBin size={24} className='text-zinc-400 hover:text-zinc-50'/>
      </button>
    </>
  )
}

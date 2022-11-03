import { ImHeart } from 'react-icons/im'
import { ITodos } from '../../models/models'
import { useToggleAchievementMutation } from '../../store/todosApi'

export const AchievementItem: React.FC<ITodos> = (todo) => {
  const [toggleAchieved] = useToggleAchievementMutation()

  const handlerToggleAchieve = async () => {
    await toggleAchieved({
      ...todo,
      achieved: !todo.achieved
    })
  }

  return (
    <>
      <span className='mr-2'>{todo.title}</span>
      <button
        onClick={() => handlerToggleAchieve()}
      >
        {todo.achieved
          ? <ImHeart color='red'/>
          : <ImHeart color='white'/>
        }
      </button>
    </>
  )
}

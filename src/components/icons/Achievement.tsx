import { ImHeart } from 'react-icons/im'
import { ITodos } from '../../models/models'
import { useToggleAchievementMutation } from '../../store/todosApi'

export const Achievement: React.FC<Partial<ITodos>> = ({ id, achieved }) => {
  const [toggleAchieved] = useToggleAchievementMutation()

  const handlerToggleTodo = async () => {
    await toggleAchieved({ id, achieved: !achieved } as ITodos)
  }

  return (
    <button
      onClick={() => handlerToggleTodo()}
    >
      {achieved
        ? <ImHeart color='red'/>
        : <ImHeart color='white'/>
      }
    </button>
  )
}

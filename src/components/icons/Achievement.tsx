import { ImHeart } from 'react-icons/im'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useState } from 'react'
import { IAchieved } from '../../models/models'
import { addAchievement, removeAchievement } from '../../store/reducers/AchievementsSlice'


export const Achievement: React.FC<IAchieved> = ({ title }) => {
  const dispatch = useAppDispatch()
  const {achievements} = useAppSelector(state => state.achievements)
  const [isAch, setIsAch] = useState(achievements.includes(title))

  const addToAchievements = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(addAchievement(title))
    setIsAch(true)
  }
  const removeFromAchievements = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(removeAchievement(title))
    setIsAch(false)
  }

  return (
    <>
      {!isAch && <button
      onClick={addToAchievements}
      > <ImHeart color='white' /> </button>}

      {isAch && <button
      onClick={removeFromAchievements}
      > <ImHeart color='red' /> </button>}
    </>
  )
}

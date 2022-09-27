import { useAppSelector } from '../../hooks/reduxHooks'
import { AchievementItem } from './AchievementItem'

export const AchievementList = () => {
  const {achievements} = useAppSelector(state => state.achievements)


  if (achievements.length === 0) return <p className='text-center'>You have no achievements.</p>

  return (
    <div className='flex justify-center pt-10 mx-auto'>
      <ul className='list-none w-80'>
      { achievements.map(f => (
        <AchievementItem key={f} title={f} />
      )) }
      </ul>
    </div>
  )
}

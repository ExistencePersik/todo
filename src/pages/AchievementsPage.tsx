import { AchievementList } from '../components/Achievements/AchievementsList'
import { useAppSelector } from '../hooks/reduxHooks'


export function AchievementsPage() {
  const {achievements} = useAppSelector(state => state.achievements)

  if (achievements.length === 0) return <p className="text-center">You have no achievements.</p>

  return (
    <AchievementList />
  )
}

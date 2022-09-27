import { Achievement } from '../components/icons/Achievement'
import { useAppSelector } from '../hooks/reduxHooks'


export function AchievementsPage() {
  const {achievements} = useAppSelector(state => state.achievements)


  if (achievements.length === 0) return <p className="text-center">You have no achievements.</p>

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        { achievements.map(f => (
          <li className='flex items-center mb-4 rounded-2xl bg-zinc-800 p-5 w-full shadow-lg shadow-green-500'>
          <span>{f}</span>
          <Achievement key={f} title={f} />
        </li>
        )) }
      </ul>
    </div>
  )
}

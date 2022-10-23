import { ITodos } from '../../models/models'
import { Achievement } from '../icons/Achievement'

export const AchievementItem: React.FC<ITodos> = ({ title }) => {
  return (
    <li className='flex items-center mb-4 rounded-2xl bg-zinc-800 p-5 w-full shadow-lg shadow-green-500'>
      <span className='mr-2'>{title}</span>
      <Achievement title={title} />
    </li>
  )
}

import { ITodos } from '../../models/models'
import { Achievement } from '../icons/Achievement'

export const AchievementItem: React.FC<ITodos> = ({ id, title, achieved }) => {
  return (
    <>
      <span className='mr-2'>{title}</span>
      <Achievement id={id} title={title} achieved={achieved} />
    </>
  )
}

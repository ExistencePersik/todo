import { ITodos } from '../../models/models'
import { useGetTodosQuery } from '../../store/todosApi'
import { AchievementItem } from './AchievementItem'

export const AchievementList = () => {
  const {data, isLoading, isError} = useGetTodosQuery()
  const achievedData = data?.filter((todo) => todo.achieved === true);

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2 className='text-red-600'>Error</h2>}

      <ul className='list-none w-80'>
        {achievedData?.map((todo: ITodos) => (
          <AchievementItem key={todo.id} {...todo}/>
        ))}
      </ul>
    </>
  )
}

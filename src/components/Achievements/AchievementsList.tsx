import { useRef } from 'react'
import cn from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ITodos } from '../../models/models'
import { useEditTodoMutation, useGetTodosQuery } from '../../store/todosApi'
import { AchievementItem } from './AchievementItem'

export const AchievementList = () => {
  const {data = [], isLoading, isError} = useGetTodosQuery()
  const [swapTodo] = useEditTodoMutation()
  const achievedData = data.filter((todo) => todo.achieved === true)

  const dragId = useRef<any>(null)
	const dropId = useRef<any>(null)
  const dragIndex = useRef<any>(null)
	const dropIndex = useRef<any>(null)

  const dragStartHandler = (e: React.DragEvent, id: string, index: number) => {
    dragId.current = id
    dragIndex.current = index
  }

  const dragEnterHandler = (e: React.DragEvent<HTMLElement>, id: string, index: number) => {
    dropId.current = id
    dropIndex.current = index
  }

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.currentTarget.className = cn('flex items-center justify-between mb-4 rounded-2xl bg-zinc-800 p-5 w-full shadow-lg shadow-yellow-200')
  }

  const dragLeaveHandler = (e: React.DragEvent) => {
    e.currentTarget.className = cn('flex space-between items-center mb-4 rounded-2xl bg-zinc-800 p-5 w-full shadow-lg shadow-yellow-400')

  }

  const dropHandler = async (e: React.DragEvent) => {
    if (dragId.current !== dropId.current) {
      await swapTodo({
        id: dragId.current,
        data: {
          title: achievedData[dropIndex.current].title,
          achieved: achievedData[dropIndex.current].achieved,
          completed: achievedData[dropIndex.current].completed
        }
      })
      await swapTodo({
        id: dropId.current,
        data: {
          title: achievedData[dragIndex.current].title,
          achieved: achievedData[dragIndex.current].achieved,
          completed: achievedData[dragIndex.current].completed
        }
      })
    }
  }

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2 className='text-red-600'>Error</h2>}


      <ul className='list-none w-80'>
        <TransitionGroup>
          {data !== undefined &&
           achievedData.map((todo: ITodos, index: number) => (
            <CSSTransition
              timeout={300}
              classNames='fade'
              key={todo.id}
            >
              <li
                className='flex space-between items-center mb-4 rounded-2xl bg-zinc-800 p-5 w-full shadow-lg shadow-yellow-400'
                draggable
                onDragStart={(e) => dragStartHandler(e, todo.id, index)}
                onDragOver={(e) => dragOverHandler(e)}
                onDragEnter={(e) => dragEnterHandler(e, todo.id, index)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDrop={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dropHandler(e)}
              >
                <AchievementItem {...todo}/>
              </li>
            </CSSTransition>
           ))}
        </TransitionGroup>
      </ul>
    </>
  )
}

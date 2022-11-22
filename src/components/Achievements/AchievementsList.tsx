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

  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const { index: dragIndex } = result.source
    const { index: dropIndex } = result.destination
    const dragId = achievedData[dragIndex].id
    const dropId = achievedData[dropIndex].id

    console.log("from", dragIndex)
    console.log("to", dropIndex)

    achievedData.forEach(async (todo) => {
      if (todo.id === dropId) {
        await swapTodo({
          id: todo.id,
          data: {
            title: achievedData[dragIndex].title,
            achieved: achievedData[dragIndex].achieved,
            completed: achievedData[dragIndex].completed
          }
        })
      } else if (dropId < dragId) {
        if (
          dropId < todo.id &&
          dragId >= todo.id
        ) {
          await swapTodo({
            id: todo.id,
            data: {
              title: achievedData[achievedData.findIndex(function(achievedData) {
                return achievedData.id === todo.id
              }) - 1].title,
              achieved: achievedData[achievedData.findIndex(function(achievedData) {
                return achievedData.id === todo.id
              }) - 1].achieved,
              completed: achievedData[achievedData.findIndex(function(achievedData) {
                return achievedData.id === todo.id
              }) - 1].completed
            }
          })
        }
      } else if (dropId > dragId) {
        if (
          dragId <= todo.id &&
          dropId > todo.id
        ) {
          await swapTodo({
            id: todo.id,
            data: {
              title: achievedData[achievedData.findIndex(function(achievedData) {
                return achievedData.id === todo.id
              }) + 1].title,
              achieved: achievedData[achievedData.findIndex(function(achievedData) {
                return achievedData.id === todo.id
              }) + 1].achieved,
              completed: achievedData[achievedData.findIndex(function(achievedData) {
                return achievedData.id === todo.id
              }) + 1].completed
            }
          })
        }
      }
    })
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

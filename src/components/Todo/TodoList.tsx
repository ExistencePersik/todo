import { useRef } from 'react'
import cn from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ITodos } from '../../models/models'
import { useEditTodoMutation, useGetTodosQuery } from '../../store/todosApi'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const {data = [], isLoading, isError} = useGetTodosQuery()
  const [swapTodo] = useEditTodoMutation()

  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const { index: dragIndex } = result.source
    const { index: dropIndex } = result.destination
    const dragId = data[dragIndex].id
    const dropId = data[dropIndex].id

  const dragEnterHandler = (e: React.DragEvent<HTMLElement>, id: string, index: number) => {
    dropId.current = id
    dropIndex.current = index
  }

    data.forEach(async (todo) => {
      if (todo.id === dropId) {
        await swapTodo({
          id: todo.id,
          data: {
            title: data[dragIndex].title,
            achieved: data[dragIndex].achieved,
            completed: data[dragIndex].completed
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
              title: data[data.findIndex(function(data) {
                return data.id === todo.id
              }) - 1].title,
              achieved: data[data.findIndex(function(data) {
                return data.id === todo.id
              }) - 1].achieved,
              completed: data[data.findIndex(function(data) {
                return data.id === todo.id
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
              title: data[data.findIndex(function(data) {
                return data.id === todo.id
              }) + 1].title,
              achieved: data[data.findIndex(function(data) {
                return data.id === todo.id
              }) + 1].achieved,
              completed: data[data.findIndex(function(data) {
                return data.id === todo.id
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
            data.map((todo: ITodos, index: number) => (
            <CSSTransition
              timeout={300}
              classNames='fade'
              key={todo.id}
            >
              <li
                className='cursor-grab flex items-center justify-between mb-4 rounded-2xl bg-zinc-800 p-5 w-full'
                draggable
                onDragStart={(e) => dragStartHandler(e, todo.id, index)}
                onDragOver={(e) => dragOverHandler(e)}
                onDragEnter={(e) => dragEnterHandler(e, todo.id, index)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDrop={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dropHandler(e)}
                >
                <TodoItem {...todo}/>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </>
  )
}

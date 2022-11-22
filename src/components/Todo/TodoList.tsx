import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
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

    console.log("from", dragIndex)
    console.log("to", dropIndex)

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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2 className='text-red-600'>Error</h2>}

      <Droppable droppableId='droppable'>
        {provided => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='list-none w-80'
          >
            <TransitionGroup>
              {data !== undefined &&
               data.map((todo: ITodos, index: number) => (
                <CSSTransition
                  timeout={300}
                  classNames='fade'
                  key={todo.id}
                >
                  <Draggable
                    index={index}
                    draggableId={`${todo.id}`}
                  >
                    {(providedInner) => (
                    <li
                      ref={providedInner.innerRef}
                      {...providedInner.draggableProps}
                      {...providedInner.dragHandleProps}
                      className='flex items-center justify-between mb-4 rounded-2xl bg-zinc-800 p-5 w-full'
                    >
                      <TodoItem {...todo}/>
                    </li>
                    )}
                  </Draggable>
                </CSSTransition>
              ))}
            </TransitionGroup>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { ITodos } from '../../models/models'
import { todosApi, useGetTodosQuery } from '../../store/todosApi'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const dispatch = useAppDispatch()
  const {data = [], isLoading, isError} = useGetTodosQuery()

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const dragIndex = result.source.index
    const dropIndex = result.destination.index

    console.log("from", dragIndex)
    console.log("to", dropIndex)

    dispatch(
      todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
        const result = draft
        const dndTodo = result.splice(dragIndex, 1)
        result.splice(dropIndex, 0, dndTodo[0])
      })
    )
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2 className='text-red-600'>Error</h2>}

      <Droppable droppableId='droppable'>
        {(provided) => (
          <ul ref={provided.innerRef}
          {...provided.droppableProps}
          className='list-none w-80'
          >
           {data !== undefined &&
              data.map((todo: ITodos, index: number) => (
                <Draggable
                key={todo.id}
                index={index}
                draggableId={`${todo.id}`}
              >
                  {(providedInner) => (
                    <li
                      ref={providedInner.innerRef}
                      {...providedInner.draggableProps}
                      {...providedInner.dragHandleProps}
                      className='flex items-center justify-around mb-4 rounded-2xl bg-zinc-800 p-5 w-full'
                    >
                      <TodoItem {...todo}/>
                    </li>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

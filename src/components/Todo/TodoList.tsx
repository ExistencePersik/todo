import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { ITodos } from '../../models/models'
import { todosApi, useEditTodoMutation, useGetTodosQuery } from '../../store/todosApi'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const {data = [], isLoading, isError} = useGetTodosQuery()
  const [swapTodo] = useEditTodoMutation()
  const dispatch = useAppDispatch()

  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const { index: dragIndex } = result.source
    const { index: dropIndex } = result.destination
    const dragId = result.draggableId
    const dragIndexNumber = data[dragIndex].index_number
    const prevIndexNumber = data[dropIndex - 1]?.index_number
    const dropIndexNumber = data[dropIndex].index_number
    const nextIndexNumber = data[dropIndex + 1]?.index_number

    console.log("from", dragIndex)
    console.log("to", dropIndex)

    let newIndex = dragIndexNumber

    if (prevIndexNumber === undefined) {
      newIndex = dropIndexNumber - 100
    } else if (nextIndexNumber === undefined) {
      newIndex = dropIndexNumber + 100
    } else if (dragIndexNumber > dropIndexNumber) {
      newIndex = Math.floor((dropIndexNumber + prevIndexNumber) / 2)
    } else if (dragIndexNumber < dropIndexNumber) {
      newIndex = Math.floor((dropIndexNumber + nextIndexNumber) / 2)
    }

    dispatch(
      todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
        draft[dragIndex].index_number = newIndex
        draft.sort((a, b) => a.index_number - b.index_number)
      })
    )

    await swapTodo({
      id: dragId,
      index_number: newIndex,
      title: data[dragIndex].title,
      completed: data[dragIndex].completed,
      achieved: data[dragIndex].achieved
    })

    // Object.defineProperty(data[dragIndex], 'index_number', {
    //   value: data[dragIndex].index_number,
    //   writable: true
    // })

    // data[dragIndex].index_number = newIndex

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

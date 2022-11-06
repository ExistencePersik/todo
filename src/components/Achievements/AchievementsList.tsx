import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { ITodos } from '../../models/models'
import { todosApi, useGetTodosQuery } from '../../store/todosApi'
import { AchievementItem } from './AchievementItem'

export const AchievementList = () => {
  const dispatch = useAppDispatch()
  const {data = [], isLoading, isError} = useGetTodosQuery()
  const achievedData = data.filter((todo) => todo.achieved === true)

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const { index: dragIndex } = result.source
    const { index: dropIndex } = result.destination

    console.log("from", dragIndex)
    console.log("to", dropIndex)

    const swapItems = function(arr: ITodos[], a: number, b: number ){
      arr.slice()
      arr[a] = arr.splice(b, 1, arr[a])[0]
    }

    swapItems(achievedData, dragIndex, dropIndex)

    // dispatch(
    //   todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
    //     const result = draft.filter((todo) => todo.achieved === true)
    //     const dndTodo = result.splice(dragIndex, 1)
    //     result.splice(dropIndex, 0, dndTodo[0])
    //   })
    // )
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
               achievedData.map((todo: ITodos, index: number) => (
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
                      className='flex space-between items-center mb-4 rounded-2xl bg-zinc-800 p-5 w-full shadow-lg shadow-yellow-400'
                    >
                      <AchievementItem {...todo}/>
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

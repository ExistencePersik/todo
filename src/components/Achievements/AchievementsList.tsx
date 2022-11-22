import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITodos } from '../models/models'

export const todosApi = createApi({
  reducerPath: 'todosApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
  }),
  endpoints: build => ({
    getTodos: build.query<ITodos[], void>({
      query: () => `todos`
    }),
    addTodo: build.mutation<ITodos, ITodos>({
      query: (body) => ({
        url: `todos`,
        method: 'POST',
        body,
      }),
      async onQueryStarted( _ , { dispatch, queryFulfilled } ) {
        try {
          const { data: addedTodo } = await queryFulfilled
          dispatch(
            todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
              draft.push(addedTodo)
            })
          )
        } catch (err) {
          console.log(err)
        }
      }
    }),
    toggleTodo: build.mutation<ITodos, ITodos>({
      query: ({id, ...patch}) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, completed }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const task = draft[Number(id) - 1]
            if (task) task.completed = completed
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    }),
    removeTodo: build.mutation<ITodos, Partial<ITodos>>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const index = draft.findIndex(todo => todo.id === id)
            draft.splice(index, 1)
          })
        )
        try {
          await queryFulfilled
        } catch {
          deleteResult.undo()
        }
      }
    })
  })
})

export const {useGetTodosQuery, useAddTodoMutation, useToggleTodoMutation, useRemoveTodoMutation} = todosApi

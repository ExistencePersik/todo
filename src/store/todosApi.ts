import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITodos } from '../models/models'
import { reorder } from '../utils/reorder'

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
    addTodo: build.mutation<ITodos, string>({
      query: (text) => ({
        url: `todos`,
        method: 'POST',
        body: {
          title: text,
          completed: false,
          achieved: false
        }
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
            const task = draft[draft.findIndex(todo => todo.id === id)]
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
    removeTodo: build.mutation<ITodos, ITodos>({
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
    }),
    toggleAchievement: build.mutation<ITodos, ITodos>({
      query: ({id, ...patch}) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, achieved }, { dispatch, queryFulfilled }) {
        const patchAchievement = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const task = draft[draft.findIndex(todo => todo.id === id)]
            if (task) task.achieved = achieved
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchAchievement.undo()
        }
      }
    }),
    updateOrder: build.mutation({
      query: ({ data }) => ({
        url: `/todos/update_order`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted({ id, newIndex}, { dispatch, queryFulfilled }) {
        const updateOrder = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            reorder(draft, id, newIndex)
          })
        )
        try {
          await queryFulfilled
        } catch {
          updateOrder.undo()
        }
      }
    }),
  })
})

export const {useGetTodosQuery, useAddTodoMutation, useToggleTodoMutation, useRemoveTodoMutation, useToggleAchievementMutation, useUpdateOrderMutation} = todosApi

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
      query: () => `todos`,
      transformResponse: (res: ITodos[]) => res.sort((a, b) => a.index_number - b.index_number)
    }),
    addTodo: build.mutation<ITodos, string>({
      query: (text) => ({
        url: `todos`,
        method: 'POST',
        body: {
          title: text,
          completed: false,
          achieved: false,
          index_number: Date.now()
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
    editTodo: build.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      // async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
      //   const editTodo = dispatch(
      //     todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
      //       const task = draft[draft.findIndex(todo => todo.id === id)]
      //       if (task) {
      //         task.index_number = data.index_number
      //       }
      //     })
      //   )
      //   try {
      //     await queryFulfilled
      //   } catch {
      //     editTodo.undo()
      //   }
      // }
    }),
  })
})

export const {useGetTodosQuery, useAddTodoMutation, useToggleTodoMutation, useRemoveTodoMutation, useToggleAchievementMutation, useEditTodoMutation} = todosApi

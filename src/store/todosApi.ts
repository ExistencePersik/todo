import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITodos } from '../models/models'

export const todosApi = createApi({
  reducerPath: 'todosAi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
  }),
  endpoints: build => ({
    getTodos: build.query<ITodos[], void>({
      query: () => `todos`,
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: 'Todos' as const, id })),
            { type: 'Todos', id: 'LIST' },
          ]
        : [{ type: 'Todos', id: 'LIST' }],
    }),
    addTodos: build.mutation<ITodos, ITodos>({
      query: (body) => ({
        url: `todos`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Todos', id: 'LIST'}]
    }),
    toggleTodos: build.mutation<ITodos, ITodos>({
      query: ({id, ...patch}) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [{type: 'Todos', id: 'LIST'}]
    }),
    removeTodos: build.mutation<ITodos, ITodos>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: 'Todos', id: 'LIST'}]
    })
  })
})

export const {useGetTodosQuery, useAddTodosMutation, useToggleTodosMutation, useRemoveTodosMutation} = todosApi

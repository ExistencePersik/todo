import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodos } from '../../models/ITodos'

type TodosState = {
  list: ITodos[]
}

const initialState: TodosState = {
  list: []
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      })
    },
    toggleComplete(state, action) {

    },
    removeTodo(state, action) {

    },
    editTodo(state, action) {

    }
  }
})

export const { addTodo } = todoSlice.actions

export default todoSlice.reducer

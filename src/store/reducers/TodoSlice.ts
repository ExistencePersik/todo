import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodos } from '../../models/models'

const MY_TASK = 't'

type TodosState = {
  list: ITodos[]
}

const initialState: TodosState = {
  list: JSON.parse(localStorage.getItem(MY_TASK) ?? '[]')
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
      localStorage.setItem(MY_TASK, JSON.stringify(state.list))
    },
    toggleComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.list.find(todo => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
      localStorage.setItem(MY_TASK, JSON.stringify(state.list))
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter(todo => todo.id !== action.payload)
      localStorage.setItem(MY_TASK, JSON.stringify(state.list))
    }
  }
})

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions

export default todoSlice.reducer

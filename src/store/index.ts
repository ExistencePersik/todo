import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/TodoSlice'
import achievementReducer from './reducers/AchievementsSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    achievements: achievementReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

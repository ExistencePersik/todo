import { configureStore } from '@reduxjs/toolkit'
import { todosApi } from './todosApi'
import achievementReducer from './reducers/AchievementsSlice'

export const store = configureStore({
  reducer: {
    achievements: achievementReducer,
    [todosApi.reducerPath]: todosApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

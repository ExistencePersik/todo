import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const MY_ACHIEVE = 'a'

interface AchievementState {
  achievements: string[]
}

const initialState: AchievementState = {
  achievements: JSON.parse(localStorage.getItem(MY_ACHIEVE) ?? '[]')
}

const achievementSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    addAchievement(state, action: PayloadAction<string>) {
      state.achievements.push(action.payload)
      localStorage.setItem(MY_ACHIEVE, JSON.stringify(state.achievements))
    },
    removeAchievement(state, action: PayloadAction<string>) {
      state.achievements = state.achievements.filter(f => f !== action.payload)
      localStorage.setItem(MY_ACHIEVE, JSON.stringify(state.achievements))
    }
  }
})

export const { addAchievement, removeAchievement } = achievementSlice.actions

export default achievementSlice.reducer

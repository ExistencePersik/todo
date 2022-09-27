import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { AchievementsPage } from './pages/AchievementsPage'
import { MainPage } from './pages/MainPage'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={ <MainPage /> } />
        <Route path='/achievements' element={ <AchievementsPage /> } />
      </Routes>
    </>
  )
}

export default App

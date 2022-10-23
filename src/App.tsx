import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { MainPage } from './pages/MainPage'
import { AchievementsPage } from './pages/AchievementsPage'


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

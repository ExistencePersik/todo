import { Route, useLocation, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { MainPage } from './pages/MainPage'
import { AchievementsPage } from './pages/AchievementsPage'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


function App() {
  const location = useLocation()

  const routes = [
    { path: '/', name: 'MainPage', Component: MainPage },
    { path: '/achievements', name: 'AchievementsPage', Component: AchievementsPage },
  ]

  return (
  <>
    <Navigation />
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={300} classNames='fade'>
        <Routes location={location}>
          {routes.map((route) => (
            <Route
              key={route.path}
              {...route}
              element={<route.Component />}
            />
          ))}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  </>
  )
}

export default App

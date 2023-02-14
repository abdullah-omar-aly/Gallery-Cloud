import './App.css'
import { Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './auth/PrivateRoute'
import { useAuth } from './auth/AuthContext'
import HomePage from './pages/HomePage'

function App() {
  const auth = useAuth()
  console.log(auth.user)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<PrivateRoute element={<ProfilePage />}/>} />
        {/* <Route path='/profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} /> */}
      </Routes>
    </div>
  )
}

export default App

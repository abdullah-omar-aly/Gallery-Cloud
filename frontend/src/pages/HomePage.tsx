import React from 'react'
import { useAuth } from '../auth/AuthContext'

function HomePage() {
    const auth = useAuth()
  return (
    <div>
        <button onClick={() => auth.logout()}>logout</button>
        <h1>Hello world {auth?.user?.name}</h1>
    </div>
  )
}

export default HomePage
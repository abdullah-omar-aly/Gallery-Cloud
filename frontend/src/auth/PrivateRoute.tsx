import React from 'react'
import { Route , Navigate, useLocation} from 'react-router-dom'
import { useAuth } from './AuthContext'

type PrivateRouteProps = {
    element: JSX.Element
    // children: JSX.Element
}

function PrivateRoute({element} : PrivateRouteProps) {
    const location = useLocation()

    const auth = useAuth()
    const user = auth?.user
    console.log(auth)
    if (!user ) return <Navigate to="/login" state={{path: location.pathname}}/>
    return element

}

export default PrivateRoute
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContextProviderProps, AuthContextType, User } from "./auth.types";
import decodeUserInfo from "./decodeUserInfo";

const AuthContext = createContext({} as AuthContextType)

const AuthProvider = ({ children }: AuthContextProviderProps) => {
    const navigate = useNavigate()

    const [token, setToken] = useLocalStorage("token")
    const [user, setUser] = useState<User | null>(token ? decodeUserInfo(token) : null)


    const login = (token: string) => {
        setToken(token)
        setUser(decodeUserInfo(token))
        navigate('/', { replace: true })

    }
    const logout = () => {
        const response = axiosPrivate.get('/auth/logout')
        setToken(null)
        setUser(null)
        navigate('/login', { replace: true })
        // console.log(response)
    }

    return <AuthContext.Provider value={{ user, login, logout, accessToken: token, setToken }}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)



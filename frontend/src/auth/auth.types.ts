export type DecodedAccessToken = {
    userInfo: User,
    exp: Number,
    iat: Number
}

export type User = {
    email: string
    picture: string
    googleId: string
    name: string
}

export type AuthContextType = {
    user: User | null
    accessToken: string
    login: (token: string) => void
    setToken: React.Dispatch<any>
    logout: () => void
}
export type AuthContextProviderProps = {
    children: React.ReactNode
}

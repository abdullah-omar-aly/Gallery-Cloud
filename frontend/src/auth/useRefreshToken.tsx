import axios from "../api/axios";
import { useAuth } from "./AuthContext";

const useRefreshToken = () => {
    const auth = useAuth()
    const refresh = async () => {
        const response  = await axios.get('/auth/refresh' , {
            withCredentials: true
        })

        auth.setToken(response.data.accessToken)
        return response.data.accessToken
    
    }
    return refresh
}

export default useRefreshToken
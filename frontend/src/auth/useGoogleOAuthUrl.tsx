import React , {useEffect , useState } from 'react'
import axios from '../api/axios'

function useGoogleOAuthUrl() {
    const [googleOAuthURL, setGoogleOAuthURL] = useState("")
    useEffect(() => {
      // Load OAuth URL
      (async () => {
        try {
          const response = await axios.get('/auth/google/url')
          const { url } = response.data
          setGoogleOAuthURL(url)
        } catch (error) {
          console.log(error)
        }
      })()
    }, [])

    return googleOAuthURL
}

export default useGoogleOAuthUrl
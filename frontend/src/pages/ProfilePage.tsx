import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../auth/useAxiosPrivate'

function ProfilePage() {
    const axiosPrivate = useAxiosPrivate()
    const [count , setCount ] = useState(0)
    const [profile , setProfile ] = useState("")
    useEffect(() => {
        (async () => {
            const response = await axiosPrivate.get('/user/profile')
            setProfile(JSON.stringify(response.data)) 
        })()
    }, [count])
  return (
    <div>ProfilePage {profile}<button onClick={() => setCount(prev => prev +1)}>{count}</button></div>
  )
}

export default ProfilePage
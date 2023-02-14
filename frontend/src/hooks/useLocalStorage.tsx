import React, { useEffect, useState } from 'react'

const useLocalStorage = (key:string , initialValue = JSON.parse(localStorage.getItem(key) as string) || null) => {

    const [value , setValue ] = useState(initialValue)

    useEffect(() => {
        localStorage.setItem(key , JSON.stringify(value))
    } , [key , value])

    return [value , setValue]
}

export  {useLocalStorage}
import { useEffect, useRef } from "react";

export default function useUpdateEffect(callback: () => void, dependencies:unknown[]) {
    const initialRenderRef = useRef(true)

    useEffect(() => {
        if (initialRenderRef.current) {
            initialRenderRef.current = false
            return
        }
        return callback()
    }, dependencies)

}
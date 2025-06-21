import { useCallback, useRef } from 'react'

export function useDebounce<T extends (...args: T[]) => void>(
    callback: T,
    throttleTime: number = 500
): (...args: Parameters<T>) => void {
    const isThrottledRef = useRef(false)

    const throttledFunction = useCallback(
        (...args: Parameters<T>) => {
            if (isThrottledRef.current) return

            isThrottledRef.current = true
            callback(...args)

            setTimeout(() => {
                isThrottledRef.current = false
            }, throttleTime)
        },
        [callback, throttleTime]
    )

    return throttledFunction
}

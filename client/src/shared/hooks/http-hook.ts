import { useCallback, useState, useRef, useEffect } from "react"


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const activeHttpRequest = useRef<AbortController[]>([])

    const sendRequest = useCallback(async (url: string, method = "GET", body = null, headers = {}) => {
        setIsLoading(true)
        const httpAbortCtrll = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrll)
        try {

            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortCtrll.signal
            })

            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            setIsLoading(false)
            return responseData
        } catch (error) {
            setIsLoading(false)
            if (error instanceof Error) {
                setError(error.message || "Something went wrong, please try again.");
            } else {
                setError("Something went wrong, please try again.");
            }
        }
    }, [])

    const handleError = () => {
        setError("")
    }

    useEffect(() => {
        const activeHttpRequests = activeHttpRequest.current;
        return () => {
            activeHttpRequests.forEach(ctrl => ctrl.abort());
        };
    }, [])

    return { isLoading, error, sendRequest, handleError }
}
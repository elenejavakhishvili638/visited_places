import { useCallback, useState, useEffect, useRef } from "react"


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const activeHttpRequest = useRef<AbortController[]>([])

    const sendRequest = useCallback(async (url: string, method = "GET", body: string | FormData | null = null, headers = {}) => {
        setIsLoading(true)
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl)

        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortCtrl.signal
            })

            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            setIsLoading(false)

            return responseData
        } catch (error) {
            setIsLoading(false)
            if (error instanceof Error && error.name === 'AbortError') {
                console.log("Fetch was aborted");
                return;
            }
            if (error instanceof Error) {
                setError(error.message || "Something went wrong, please try again.");
                throw error
            } else {
                setError("Something went wrong, please try again.");
                throw error
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
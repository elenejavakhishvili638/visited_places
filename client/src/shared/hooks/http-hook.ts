import { useCallback, useState } from "react"


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const sendRequest = useCallback(async (url: string, method = "GET", body: string | FormData | null = null, headers = {}) => {
        setIsLoading(true)
        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
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

    return { isLoading, error, sendRequest, handleError }
}
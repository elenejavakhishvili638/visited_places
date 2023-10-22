import { useEffect, useState } from "react"
import { Person } from "../../types/userTypes"
import UsersList from "../components/UsersList"
import ErrorModal from "../../shared/components/UiElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner"

function Users() {
    const [users, setUsers] = useState<Person[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            try {
                const response = await fetch("http://localhost:5000/api/users")
                const responseData = await response.json()
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setUsers(responseData.users)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                if (error instanceof Error) {
                    setError(error.message || "Something went wrong, please try again.");
                } else {
                    setError("Something went wrong, please try again.");
                }
            }
        }
        fetchUsers()
    }, [])

    const handleError = () => {
        setError("")
    }

    return (
        <div>
            <ErrorModal error={error} onClear={handleError} />
            {isLoading ? <LoadingSpinner asOverlay /> : <UsersList users={users} />}
        </div>
    )
}

export default Users
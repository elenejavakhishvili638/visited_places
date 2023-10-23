import { useEffect, useState } from "react"
import { Person } from "../../types/userTypes"
import UsersList from "../components/UsersList"
import ErrorModal from "../../shared/components/UiElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"

function Users() {
    const [users, setUsers] = useState<Person[]>([])
    const { isLoading, error, handleError, sendRequest } = useHttpClient()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await sendRequest("http://localhost:5000/api/users")
                setUsers(response.users)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, [sendRequest])

    return (
        <div>
            <ErrorModal error={error} onClear={handleError} />
            {isLoading ? <LoadingSpinner asOverlay /> : <UsersList users={users} />}
        </div>
    )
}

export default Users
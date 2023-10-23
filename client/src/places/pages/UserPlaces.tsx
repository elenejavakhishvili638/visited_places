import { useHttpClient } from "../../shared/hooks/http-hook"
import { Place } from "../../types/placeTypes"
import PlaceList from "../components/PlaceList"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import ErrorModal from "../../shared/components/UiElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner"

const UserPlaces = () => {
    const [places, setPlaces] = useState<Place[]>([])
    const { isLoading, error, handleError, sendRequest } = useHttpClient()
    const { userId } = useParams()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/places/user/${userId}`)
                setPlaces(response.places)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, [sendRequest, userId])

    return (
        <>
            <ErrorModal error={error} onClear={handleError} />
            {isLoading ? <LoadingSpinner asOverlay /> : <PlaceList places={places} />}
        </>
    )
}

export default UserPlaces
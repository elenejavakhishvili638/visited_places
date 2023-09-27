import { Place } from "../../types/placeTypes"
import PlaceList from "../components/PlaceList"
import { useParams } from "react-router"

const DUMMY_PLACES: Place[] = [
    {
        id: "p1",
        name: "home",
        description: "oneksdbkjsc",
        image: "dnksjdkjb",
        address: "djksd",
        coordinates: {
            lat: 48.8584,
            lng: 2.2945
        },
        userId: "u1"
    },
    {
        id: "p2",
        name: "homes",
        description: "oneksdbkjsc",
        image: "dnksjdkjb",
        address: "djksd",
        coordinates: {
            lat: 48.8584,
            lng: 2.2945
        },
        userId: "u2"
    }
]

const UserPlaces = () => {
    const { userId } = useParams()
    const userPlaces = DUMMY_PLACES.filter((place) => place.userId === userId)
    return <PlaceList places={userPlaces} />
}

export default UserPlaces
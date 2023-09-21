import { Place } from "../../types/placeTypes"
import PlaceList from "../components/PlaceList"

const DUMMY_PLACES: Place[] = [
    {
        id: "p1",
        name: "home",
        description: "oneksdbkjsc",
        image: "dnksjdkjb",
        address: "djksd",
        coordinates: {
            lat: "dsds",
            lng: "sjdsnjkn"
        },
        userId: "u1"
    },
    {
        id: "p2",
        name: "home",
        description: "oneksdbkjsc",
        image: "dnksjdkjb",
        address: "djksd",
        coordinates: {
            lat: "dsds",
            lng: "sjdsnjkn"
        },
        userId: "u2"
    }
]

const UserPlaces = () => {

    return <PlaceList places={DUMMY_PLACES} />
}

export default UserPlaces
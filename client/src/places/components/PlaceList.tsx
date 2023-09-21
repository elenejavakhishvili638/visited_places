import Card from "../../shared/components/UiElements/Card"
import { Place } from "../../types/placeTypes"
import PlaceItem from "./PlaceItem"
import "./PlaceList.css"

type Props = {
    places: Place[]
}

const PlaceList = (props: Props) => {
    const { places } = props
    if (places.length === 0) {
        return <div className="place-list center">
            <Card>
                <h2>No places found. Maybe create one?</h2>
                <button>Share place</button>
            </Card>
        </div>
    }
    return (
        <ul className="place-list">
            {places.map((place) => <PlaceItem key={place.id} id={place.id} image={place.image} name={place.name} description={place.description} address={place.address} coordinates={place.coordinates} />)}
        </ul>
    )
}

export default PlaceList
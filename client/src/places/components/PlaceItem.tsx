import Card from "../../shared/components/UiElements/Card"
import { Location } from "../../types/placeTypes"
import "./PlaceItem.css"

type Props = {
    image: string,
    name: string,
    description: string,
    address: string,
    coordinates: Location
}

const PlaceItem = (props: Props) => {
    const { image, description, name, address } = props
    return (
        <li className="place-item">
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img src={image} alt={name} />
                </div>
                <div>
                    <h2>{name}</h2>
                    <h3>{address}</h3>
                    <p>{description}</p>
                </div>
                <div className="place-item__actions">
                    <button>VIEW ON A MAP</button>
                    <button>EDIT</button>
                    <button>DELETE</button>
                </div>
            </Card>
        </li>
    )
}

export default PlaceItem
import Button from "../../shared/components/FormElements/Button"
import Card from "../../shared/components/UiElements/Card"
import { Location } from "../../types/placeTypes"
import "./PlaceItem.css"

type Props = {
    image: string,
    name: string,
    description: string,
    address: string,
    coordinates: Location,
    id: string
}

const PlaceItem = (props: Props) => {
    const { image, description, name, address, id } = props
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
                    <Button inverse>VIEW ON A MAP</Button>
                    <Button to={`/places/${id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
            </Card>
        </li>
    )
}

export default PlaceItem
import { useState } from "react"
import Button from "../../shared/components/FormElements/Button"
import Card from "../../shared/components/UiElements/Card"
import { Location } from "../../types/placeTypes"
import "./PlaceItem.css"
import Modal from "../../shared/components/UiElements/Modal"

type Props = {
    image: string,
    name: string,
    description: string,
    address: string,
    coordinates: Location,
    id: string
}

const PlaceItem = (props: Props) => {

    const [showMap, setShowMap] = useState<boolean>(false)

    const openMap = () => setShowMap(true)
    const closeMap = () => setShowMap(false)


    const { image, description, name, address, id } = props
    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMap}
                header={address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMap} >CLOSE</Button>}
            >

                <div className="map-container">THE MAP</div>
            </Modal>
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
                        <Button inverse onClick={openMap}>VIEW ON A MAP</Button>
                        <Button to={`/places/${id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </>
    )
}

export default PlaceItem
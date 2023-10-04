import { useState } from "react"
import Button from "../../shared/components/FormElements/Button"
import Card from "../../shared/components/UiElements/Card"
import { Location } from "../../types/placeTypes"
import "./PlaceItem.css"
import Modal from "../../shared/components/UiElements/Modal"
import Map from "../../shared/components/UiElements/Map"

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
    const [showConfirm, setShowConfirm] = useState<boolean>(false)

    const openMap = () => setShowMap(true)
    const closeMap = () => setShowMap(false)

    const showDeleteWarning = () => setShowConfirm(true)
    const closeDeleteWarning = () => setShowConfirm(false)
    const handleDelete = () => {
        setShowConfirm(false)
        console.log("delete")
    }



    const { image, description, name, address, id, coordinates } = props
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

                <div className="map-container">
                    <Map center={coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <>
                        <Button inverse onClick={closeDeleteWarning}>CANCEL</Button>
                        <Button danger onClick={handleDelete}>DELETE</Button>
                    </>
                }
                show={showConfirm}
                onCancel={closeDeleteWarning}
            >
                <p>Do you want to proceed and delete this place?</p>
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
                        <Button danger onClick={showDeleteWarning}>DELETE</Button>
                    </div>
                </Card>
            </li>
        </>
    )
}

export default PlaceItem
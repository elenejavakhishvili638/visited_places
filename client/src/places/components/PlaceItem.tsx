import { useContext, useState } from "react"
import Button from "../../shared/components/FormElements/Button"
import Card from "../../shared/components/UiElements/Card"
import { Location } from "../../types/placeTypes"
import "./PlaceItem.css"
import Modal from "../../shared/components/UiElements/Modal"
import Map from "../../shared/components/UiElements/Map"
import { AuthContext } from "../../shared/context/AuthContext"
import { useHttpClient } from "../../shared/hooks/http-hook"
import ErrorModal from "../../shared/components/UiElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner"

type Props = {
    image: string,
    name: string,
    description: string,
    address: string,
    coordinates: Location,
    id: string,
    onDelete: (deletedPlaceId: string) => void,
    creator: string
}

const PlaceItem = (props: Props) => {
    const { error, isLoading, handleError, sendRequest } = useHttpClient()
    const [showMap, setShowMap] = useState<boolean>(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const { image, description, name, address, id, coordinates, onDelete, creator } = props
    const auth = useContext(AuthContext)

    const openMap = () => setShowMap(true)
    const closeMap = () => setShowMap(false)

    const showDeleteWarning = () => setShowConfirm(true)

    const closeDeleteWarning = () => setShowConfirm(false)

    const handleDelete = async () => {
        setShowConfirm(false)
        try {
            await sendRequest(`http://localhost:5000/api/places/${id}`, "DELETE")
            onDelete(id)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal error={error} onClear={handleError} />
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
                        <img src={"http://localhost:5000/" + image} alt={name} />
                    </div>
                    <div className="place-item__info">
                        <h2>{name}</h2>
                        <h3>{address}</h3>
                        <p>{description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMap}>VIEW ON A MAP</Button>
                        {auth.userId === creator && (
                            <>
                                <Button to={`/places/${id}`}>EDIT</Button>
                                <Button danger onClick={showDeleteWarning}>DELETE</Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </>
    )
}

export default PlaceItem
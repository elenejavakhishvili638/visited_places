import { useParams } from "react-router-dom"
import "./PlaceForm.css"
import { Place } from "../../types/placeTypes"
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { useForm } from "../../shared/hooks/form-hook"
import { useContext, useEffect, useState } from "react"
import Card from "../../shared/components/UiElements/Card"
import { useHttpClient } from "../../shared/hooks/http-hook"
import ErrorModal from "../../shared/components/UiElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner"
import { useNavigate } from "react-router"
import { AuthContext } from "../../shared/context/AuthContext"

function UpdatePlace() {
    const { placeId } = useParams()
    const [foundPlace, setFoundPlace] = useState<Place>()
    const { error, handleError, sendRequest, isLoading } = useHttpClient()
    const auth = useContext(AuthContext)
    const [formState, inputHandle, setFormData] = useForm({
        title: {
            value: "",
            isValid: false
        },
        description: {
            value: "",
            isValid: false
        },
    }, false)
    const navigate = useNavigate()


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/places/${placeId}`)
                setFoundPlace(response.place)
                setFormData({
                    title: {
                        value: response.place.name,
                        isValid: true
                    },
                    description: {
                        value: response.place.description,
                        isValid: true
                    },
                }, true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, [placeId, sendRequest, setFormData])


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            sendRequest(
                `http://localhost:5000/api/places/${placeId}`, "PATCH", JSON.stringify({
                    name: formState.inputs.title?.value,
                    description: formState.inputs.description?.value
                }), { "Content-Type": "Application/json" }
            )
            navigate(`/${auth.userId}/places`)
        } catch (error) {
            console.log(error)
        }
    }


    if (!foundPlace) {
        return (
            <div className="center">
                <Card style={{ padding: "1rem" }}>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        )
    }

    return (
        <>
            <ErrorModal error={error} onClear={handleError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {
                !isLoading && foundPlace && (
                    <form className="place-form" onSubmit={handleSubmit}>
                        <Input
                            id="title"
                            elementType="input"
                            type="text"
                            label="Title"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="PLease enter a valid value"
                            onInput={inputHandle}
                            value={formState.inputs.title?.value}
                            valid={formState.inputs.title?.isValid}
                        />
                        <Input
                            id="description"
                            elementType="textarea"
                            label="Description"
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorText="PLease enter a valid value"
                            onInput={inputHandle}
                            value={formState.inputs.description?.value}
                            valid={formState.inputs.description?.isValid}
                        />
                        <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
                    </form>
                )
            }
        </>
    )
}

export default UpdatePlace
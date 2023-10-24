import Input from "../../shared/components/FormElements/Input"
import "./PlaceForm.css"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import { useNavigate } from "react-router"
import ImageUplaod from "../../shared/components/FormElements/ImageUplaod";

const NewPlace = () => {
    const [formState, inputHandle] = useForm({
        title: {
            value: "",
            isValid: false
        },
        description: {
            value: "",
            isValid: false
        },
        address: {
            value: "",
            isValid: false
        }
    }, false)
    const { isLoading, error, sendRequest, handleError } = useHttpClient()
    const { userId } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const formData = new FormData()
            if (formState.inputs.title?.value) {
                formData.append("name", formState.inputs.title?.value)
            }
            if (formState.inputs.description?.value) {
                formData.append("description", formState.inputs.description?.value)
            }
            if (formState.inputs.address?.value) {
                formData.append("address", formState.inputs.address?.value)
            }
            if (formState.inputs.image?.value) {
                formData.append("image", formState.inputs.image?.value)
            }
            if (userId) {
                formData.append("userId", userId)
            }
            await sendRequest(
                "http://localhost:5000/api/places", "POST", formData
            )
            navigate(`/${userId}/places`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ErrorModal onClear={handleError} error={error} />
            <form className="place-form" onSubmit={handleSubmit}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="title"
                    onInput={inputHandle}
                    elementType="input"
                    type="text"
                    label="Title"
                    errorText="Please enter a valid value"
                    validators={[VALIDATOR_REQUIRE()]}
                />
                <ImageUplaod id="image" center={false} onInput={inputHandle} errorText="Please provide an image" />
                <Input
                    id="description"
                    onInput={inputHandle}
                    elementType="textarea"
                    label="Description"
                    errorText="Please enter a valid value, at least 5 characters"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                />
                <Input
                    id="address"
                    onInput={inputHandle}
                    elementType="input"
                    type="text"
                    label="Address"
                    errorText="Please enter a valid value"
                    validators={[VALIDATOR_REQUIRE()]}
                />
                <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
            </form>
        </>
    )
}

export default NewPlace
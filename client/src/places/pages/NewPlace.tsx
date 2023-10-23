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
            sendRequest(
                "http://localhost:5000/api/places", "POST", JSON.stringify({
                    name: formState.inputs.title?.value,
                    description: formState.inputs.description?.value,
                    address: formState.inputs.address?.value,
                    userId: userId
                }), { "Content-Type": "Application/json" }
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
import { useParams } from "react-router-dom"
import "./PlaceForm.css"
import { Place } from "../../types/placeTypes"
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { useForm } from "../../shared/hooks/form-hook"

const DUMMY_PLACES: Place[] = [
    {
        id: "p1",
        name: "home",
        description: "oneksdbkjsc",
        image: "dnksjdkjb",
        address: "djksd",
        coordinates: {
            lat: 48.8584,
            lng: 2.2945
        },
        userId: "u1"
    },
    {
        id: "p2",
        name: "homes",
        description: "oneksdbkjsc",
        image: "dnksjdkjb",
        address: "djksd",
        coordinates: {
            lat: 48.8584,
            lng: 2.2945
        },
        userId: "u2"
    }
]

function UpdatePlace() {
    const { placeId } = useParams()
    const foundPlace = DUMMY_PLACES.find((place) => place.id === placeId)
    const [formState, inputHandle] = useForm({
        title: {
            value: foundPlace!.name,
            isValid: true
        },
        description: {
            value: foundPlace!.description,
            isValid: true
        },
    }, true)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(formState.inputs)
    }


    if (!foundPlace) {
        return (
            <div className="center">
                <h2>Could not find place!</h2>
            </div>
        )
    }

    return (
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

export default UpdatePlace
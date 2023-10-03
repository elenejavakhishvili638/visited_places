import Input from "../../shared/components/FormElements/Input"
import "./PlaceForm.css"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    return (
        <form className="place-form" onSubmit={handleSubmit}>
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
    )
}

export default NewPlace
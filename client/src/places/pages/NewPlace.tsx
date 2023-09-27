import Input from "../../shared/components/FormElements/Input"
import "./NewPlace.css"
import { VALIDATOR_REQUIRE } from "../../shared/util/validators"

const NewPlace = () => {
    return (
        <form className="place-form">
            <Input
                elementType="input"
                type="text"
                label="Title"
                errorText="Please enter a valid value"
                validators={[VALIDATOR_REQUIRE()]}
            />
        </form>
    )
}

export default NewPlace
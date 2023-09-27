import Input from "../../shared/components/FormElements/Input"
import "./NewPlace.css"

const NewPlace = () => {
    return (
        <form className="place-form">
            <Input elementType="input" type="text" label="Title" errorText="Please enter a valid value" />
        </form>
    )
}

export default NewPlace
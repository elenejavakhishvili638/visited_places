import Input from "../../shared/components/FormElements/Input"
import "./PlaceForm.css"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { useCallback, useReducer } from "react"
import Button from "../../shared/components/FormElements/Button";

type InputData = {
    value: string;
    isValid: boolean;
};

type FormState = {
    inputs: {
        title: InputData,
        description: InputData,
        address: InputData
    },
    isValid: boolean
}

type FormAction = {
    type: "INPUT_CHANGE";
    inputId: string,
    isValid: boolean,
    value: string
}


const formReducer = (state: FormState, action: FormAction) => {
    let formIsValid = true;
    switch (action.type) {
        case "INPUT_CHANGE":
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId as keyof typeof state.inputs].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            }
        default:
            return state
    }
}

const NewPlace = () => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
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
        },
        isValid: false
    })

    const inputHandle = useCallback((id: string, value: string, valid: boolean) => {
        dispatch({ type: "INPUT_CHANGE", value, isValid: valid, inputId: id })
    }, [])

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
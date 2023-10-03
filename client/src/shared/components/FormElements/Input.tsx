import { useEffect, useReducer } from "react"
import "./Input.css"
import { validate } from "../../util/validators";

type InputState = {
    value: string;
    isValid: boolean;
    isTouched: boolean
};

type ValidatorFunction =
    | ({ type: string })
    | ((val: number) => { type: string; val: number });

type InputAction = {
    type: "CHANGE";
    value: string;
    validators: ValidatorFunction[];
} | {
    type: "TOUCH";
}

type Props = {
    label: string,
    type?: string,
    id: string,
    elementType: string,
    placeholder?: string,
    rows?: number,
    errorText?: string,
    validators: ValidatorFunction[],
    onInput: (id: string, value: string, valid: boolean) => void,
    value?: string,
    valid?: true
}

const inputReducer = (state: InputState, action: InputAction) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            }
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            }
        default:
            return state
    }
}

function Input({ label, type, id, elementType, placeholder, rows, errorText, validators, onInput, value, valid }: Props) {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: value || "",
        isValid: valid || false,
        isTouched: false
    });

    useEffect(() => {
        onInput(id, inputState.value, inputState.isValid);
    }, [id, inputState.isValid, inputState.value, onInput])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: "CHANGE", value: e.target.value, validators: validators })
    }

    const handleTouch = () => {
        dispatch({
            type: "TOUCH"
        })
    }

    const element = elementType === "input" ? (
        <input
            onChange={handleChange}
            id={id}
            type={type}
            placeholder={placeholder}
            value={inputState.value}
            onBlur={handleTouch}
        />) : (
        <textarea
            onChange={handleChange}
            id={id}
            rows={rows || 3}
            placeholder={placeholder}
            value={inputState.value}
            onBlur={handleTouch}
        />)
    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && "form-control--invalid"}`}>
            <label htmlFor={id} >{label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        </div>
    )
}

export default Input
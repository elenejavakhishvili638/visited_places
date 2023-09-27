import { useReducer } from "react"
import "./Input.css"

type InputState = {
    value: string;
    isValid: boolean;
};

type InputAction = {
    type: "CHANGE";
    value: string;
}

type Props = {
    label: string,
    type: string,
    id: string,
    elementType: string,
    placeholder: string,
    rows?: number,
    errorText?: string
}

const inputReducer = (state: InputState, action: InputAction) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: true
            };
        default:
            return state
    }
}

function Input({ label, type, id, elementType, placeholder, rows, errorText }: Props) {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: "", isValid: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: "CHANGE", value: e.target.value })
    }

    const element = elementType === "input" ? <input onChange={handleChange} id={id} type={type} placeholder={placeholder} value={inputState.value} /> : <textarea onChange={handleChange} id={id} rows={rows || 3} placeholder={placeholder} value={inputState.value} />
    return (
        <div className={`form-control ${!inputState.isValid && "form-control--invalid"}`}>
            <label htmlFor={id} >{label}</label>
            {element}
            {!inputState.isValid && <p>{errorText}</p>}
        </div>
    )
}

export default Input
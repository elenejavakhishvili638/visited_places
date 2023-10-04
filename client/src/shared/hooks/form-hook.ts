import { useCallback, useReducer } from "react"

type InputKeys = 'title' | 'description' | 'address' | 'email' | 'password';

type InputData = {
    value: string;
    isValid: boolean;
};

type FormInputs = Partial<Record<InputKeys, InputData>>;

type FormState = {
    inputs: FormInputs
    isValid: boolean
}


type FormAction = {
    type: "INPUT_CHANGE";
    inputId: string,
    isValid: boolean,
    value: string
} | {
    type: 'SET_DATA',
    inputs: FormInputs,
    isValid: boolean
}


const formReducer = (state: FormState, action: FormAction) => {
    let formIsValid = true;
    switch (action.type) {
        case "INPUT_CHANGE":
            for (const inputId in state.inputs) {
                const input = state.inputs[inputId as keyof typeof state.inputs]
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else if (input) {
                    formIsValid = formIsValid && input.isValid
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
        case "SET_DATA":
            return {
                inputs: action.inputs,
                isValid: action.isValid
            }
        default:
            return state
    }
}


type UseFormReturnType = [FormState, (id: string, value: string, valid: boolean) => void, (inputData: FormInputs, formValidity: boolean) => void];


export const useForm = (initialInputs: FormInputs, initialValidity: boolean): UseFormReturnType => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialValidity
    })

    const inputHandle = useCallback((id: string, value: string, valid: boolean) => {
        dispatch({ type: "INPUT_CHANGE", value, isValid: valid, inputId: id })
    }, [])

    const setFormData = useCallback((inputData: FormInputs, formValidity: boolean) => {
        dispatch({ type: "SET_DATA", inputs: inputData, isValid: formValidity })
    }, [])

    return [formState, inputHandle, setFormData]
}
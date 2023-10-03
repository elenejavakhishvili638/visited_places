import { useCallback, useReducer } from "react"

type InputKeys = 'title' | 'description' | 'address';

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
        default:
            return state
    }
}


type UseFormReturnType = [FormState, (id: string, value: string, valid: boolean) => void];


export const useForm = (initialInputs: FormInputs, initialValidity: boolean): UseFormReturnType => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialValidity
    })

    const inputHandle = useCallback((id: string, value: string, valid: boolean) => {
        dispatch({ type: "INPUT_CHANGE", value, isValid: valid, inputId: id })
    }, [])

    return [formState, inputHandle]
}
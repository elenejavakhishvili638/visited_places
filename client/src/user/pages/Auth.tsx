import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import Card from "../../shared/components/UiElements/Card"
import "./Auth.css"
import { useForm } from "../../shared/hooks/form-hook"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { useState } from "react"

const Auth = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [formState, inputHandle, setFormData] = useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    const switchMode = () => {
        if (!isLogin) {
            setFormData({
                ...formState.inputs,
                name: undefined,
            }, formState.inputs.email!.isValid && formState.inputs.password!.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                }
            }, false)
        }
        setIsLogin(prevValue => !prevValue)
    }

    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                {
                    !isLogin && (
                        <Input
                            type="text"
                            elementType="input"
                            id="name"
                            label="Your name"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandle}
                            errorText="Please enter your name"
                        />
                    )
                }
                <Input
                    type="email"
                    elementType="input"
                    label="E-mail"
                    id="email"
                    validators={[VALIDATOR_EMAIL()]}
                    onInput={inputHandle}
                    errorText="Please enter a valid email address"
                />
                <Input
                    type="password"
                    elementType="input"
                    label="Password"
                    id="password"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
                    onInput={inputHandle}
                    errorText="Please enter valid password, at least 8 characters"
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLogin ? "LOGIN" : "SIGNUP"}
                </Button>
            </form>
            <Button inverse onClick={switchMode}>
                SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
            </Button>
        </Card>
    )
}

export default Auth
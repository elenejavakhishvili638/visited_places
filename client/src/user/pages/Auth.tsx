import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import Card from "../../shared/components/UiElements/Card"
import "./Auth.css"
import { useForm } from "../../shared/hooks/form-hook"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { useContext, useState } from "react"
import { AuthContext } from "../../shared/context/AuthContext"
import { useNavigate } from "react-router"
import ErrorModal from "../../shared/components/UiElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"

const Auth = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
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
    const { isLoading, error, handleError, sendRequest } = useHttpClient()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isLogin) {
            try {
                await sendRequest("http://localhost:5000/api/users/login", "POST",
                    JSON.stringify({
                        email: formState.inputs.email?.value,
                        password: formState.inputs.password?.value
                    }),
                    {
                        "Content-Type": "Application/json"
                    },
                )
                auth.login()
                navigate("/")
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await sendRequest("http://localhost:5000/api/users/signup", "POST",
                    JSON.stringify({
                        name: formState.inputs.name?.value,
                        email: formState.inputs.email?.value,
                        password: formState.inputs.password?.value
                    }),
                    { "Content-Type": "Application/json" },
                )
                auth.login()
                navigate("/")
            } catch (error) {
                console.log(error)
            }
        }

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
        <>
            <ErrorModal error={error} onClear={handleError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
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
        </>
    )
}

export default Auth
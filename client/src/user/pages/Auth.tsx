import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import Card from "../../shared/components/UiElements/Card"
import "./Auth.css"
import { useForm } from "../../shared/hooks/form-hook"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"

const Auth = () => {
    const [formState, inputHandle] = useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        },
    }, false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={handleSubmit}>
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
                <Button type="submit" disabled={!formState.isValid}>LOG IN</Button>
            </form>
        </Card>
    )
}

export default Auth
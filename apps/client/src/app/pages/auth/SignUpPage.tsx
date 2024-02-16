import { FormEventHandler, useContext } from "react";
import { Button } from "../../component/Button";
import Container from "../../component/Container";
import { InputField } from "../../component/Inputfield";
import { useAuthContext } from "../../context/auth.context";

export default function SignUpPage() {
    // const { signup } = useAuthContext();
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
    }

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <InputField
                    name="email"
                    placeholder="Email"
                    type="email"
                    label="Email"
                />
                <InputField
                    name="password"
                    placeholder="Password"
                    type="password"
                    label="Confirm Password"
                />
                <InputField
                    name="confirmPassword"
                    placeholder="Confirm password"
                    type="password"
                    label="Email"
                />
                <InputField
                    name="email"
                    placeholder="Email"
                    type="email"
                    label="Email"
                />
                <Button name="SignUp" />
            </form>
        </Container>
    );
}

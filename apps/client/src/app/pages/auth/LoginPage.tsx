import { FormEvent, FormEventHandler } from "react";
import { Button } from "../../component/Button";
import Container from "../../component/Container";
import { InputField } from "../../component/Inputfield";
import { Logo } from "../../component/Logo";
import "../../styles/login.scss";

const LoginPage = () => {
    async function loginFormHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const login = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
    }

    return (
        <Container sx={{ paddingTop: "80px" }}>
            <form className="form-style" onSubmit={loginFormHandler}>
                <Logo />
                <InputField
                    name="email"
                    placeholder="Email"
                    type="email"
                    label="Email"
                    autoComplete="email"
                />
                <InputField
                    name="password"
                    placeholder="Password"
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                />
                <Button name="Login" />
            </form>
        </Container>
    );
};

export default LoginPage;

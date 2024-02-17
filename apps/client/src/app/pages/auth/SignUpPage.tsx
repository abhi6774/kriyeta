import { FormEventHandler, useContext, useRef, useState } from "react";
import { Button } from "../../component/Button";
import Container from "../../component/Container";
import { InputField } from "../../component/Inputfield";
import { Logo } from "../../component/Logo";
import { useAuthContext } from "../../context/auth.context";
import "../../styles/formstyle.scss";
import { AvatarInput } from "../../component/AvatarInput";

export default function SignUpPage() {
    // const { signup } = useAuthContext();
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
    }

    return (
        <Container sx={{ paddingTop: "80px" }}>
            <form className="form-style" onSubmit={onSubmit}>
                <Logo />
                <AvatarInput />
                <InputField
                    name="email"
                    placeholder="Email"
                    type="email"
                    label="Email"
                    autoComplete="email"
                />
                <InputField
                    name="userName"
                    placeholder="Username"
                    type="text"
                    label="Username"
                    autoComplete="username"
                />
                <InputField
                    name="password"
                    placeholder="Password"
                    type="password"
                    label="Password"
                    autoComplete="new-password"
                />
                <InputField
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    autoComplete="new-password"
                />
                <Button
                    onClickHandler={(e) => e.preventDefault()}
                    name="SignUp"
                />
            </form>
        </Container>
    );
}

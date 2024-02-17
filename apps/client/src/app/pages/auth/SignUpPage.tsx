import { FormEventHandler, useContext, useRef, useState } from "react";
import { Button } from "../../component/Button";
import Container from "../../component/Container";
import { InputField } from "../../component/Inputfield";
import { Logo } from "../../component/Logo";
import { useAuthContext } from "../../context/auth.context";
import "../../styles/formstyle.scss";
import { AvatarInput } from "../../component/AvatarInput";
import axios from "axios";
import { RootPath } from "../../axios.proxy";
import { SignUpResponse } from "@kriyeta/api-interaces";

export default function SignUpPage() {
    const {} = useAuthContext();
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const signUpData = {
            email: formData.get("email") as string,
            userName: formData.get("userName") as string,
            fullName: formData.get("fullName") as string,
            password: formData.get("password") as string,
            avatar: formData.get("avatar") as string,
        };

        try {
            const response = await axios.post<{}, { data: SignUpResponse }>(
                `${RootPath}/auth/register`,
                signUpData
            );

            // console.log(response);
        } catch (err) {
            // console.log(err);
        }
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
                    name="fullName"
                    placeholder="Full Name"
                    id="fullName"
                    type="text"
                    label="Full Name"
                />
                <InputField
                    name="password"
                    placeholder="Password"
                    type="password"
                    label="Password"
                    autoComplete="new-password"
                />

                <Button type="submit" name="SignUp" />
            </form>
        </Container>
    );
}

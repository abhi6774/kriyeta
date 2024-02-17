import { useRef, useState } from "react";
import { Button } from "../../component/Button";
import Container from "../../component/Container";
import { InputField } from "../../component/Inputfield";
import { Logo } from "../../component/Logo";
import { useAuthContext } from "../../context/auth.context";
import "../../styles/formstyle.scss";

import axios from "axios";

export default function SignUpPage() {
    const {} = useAuthContext();
    const ref = useRef<HTMLInputElement>(null);

    const [fullName, setFullName] = useState<string>("");
    const [userName, setuserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    // const [avatarFile, setAvatarFile] = useState<File | null>(null);

    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const signUpData = {
            fullName,
            userName,
            email,
            password,
        };
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/auth/register",
                signUpData,
                // { withCredentials: true }
            );
            console.log(response);
        } catch (error: any) {
            console.log(error);
        }
    }
    // function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     const file = e.target.files?.item(0);

    //     if (file) {
    //         const url = URL.createObjectURL(file);
    //         console.log(url);
    //         setAvatarUrl(url);
    //         setAvatarFile(file);
    //     }
    // }

    return (
        <Container sx={{ paddingTop: "80px" }}>
            <form className="form-style" onSubmit={register}>
                <Logo />

                <InputField
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    name="email"
                    placeholder="Email"
                    type="email"
                    label="Email"
                    autoComplete="email"
                />
                <InputField
                    value={userName}
                    onChange={(e) => setuserName(e.currentTarget.value)}
                    name="userName"
                    placeholder="Username"
                    type="text"
                    label="Username"
                    autoComplete="username"
                />
                <InputField
                    value={fullName}
                    onChange={(e) => setFullName(e.currentTarget.value)}
                    name="fullName"
                    placeholder="Full Name"
                    id="fullName"
                    type="text"
                    label="Full Name"
                />
                <InputField
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
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

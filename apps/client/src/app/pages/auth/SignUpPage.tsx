import { useEffect, useRef, useState } from "react";
import { Button } from "../../component/Button";
import Container from "../../component/Container";
import { InputField } from "../../component/Inputfield";
import { Logo } from "../../component/Logo";
import { useAuthContext } from "../../context/auth.context";
import "../../styles/formstyle.scss";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootPath } from "../../axios.proxy";
import { SignUpResponse } from "@kriyeta/api-interaces";

export default function SignUpPage() {
    const { setUser, user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);
    const ref = useRef<HTMLInputElement>(null);

    const [fullName, setFullName] = useState<string>("");
    const [userName, setuserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loading, setLoading] = useState(false);

    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const signUpData = {
            fullName,
            userName,
            email,
            password,
        };
        try {
            setLoading(true);
            const response = await axios.post<{}, { data: SignUpResponse }>(
                `${RootPath}/auth/register`,
                signUpData
            );
            setLoading(false);
            if (response.data.success && response.data.data) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data)
                );
                setUser(response.data.data);
            }
            console.log(response);
        } catch (error: any) {
            console.log(error);
            setLoading(false);
        }
    }
    if (loading) {
        return (
            <Container>
                <div
                    style={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h1>Loading...</h1>
                </div>
            </Container>
        );
    }

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

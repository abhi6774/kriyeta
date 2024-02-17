import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { Button } from "../../component/Button";
import Container from "../../component/Container";
import { InputField } from "../../component/Inputfield";
import { Logo } from "../../component/Logo";
import "../../styles/login.scss";
import { LoginData, LoginResponse } from "@kriyeta/api-interaces";
import axios from "axios";
import { RootPath } from "../../axios.proxy";
import { useAuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

function SaveUserDetailsLocally(response: LoginResponse) {
    const indexDb = window.indexedDB.open("kriyeta", 1);
    indexDb.onsuccess = (e) => {
        const db = indexDb.result;
        const tx = db.transaction("user", "readwrite");
        const store = tx.objectStore("user");
        store.put(response.data, "user");
    };

    indexDb.onerror = (e) => {
        console.log(e);
    };

    indexDb.onupgradeneeded = (e) => {
        const db = indexDb.result;
        db.createObjectStore("user", { keyPath: "id" });
    };
}

const LoginPage = () => {
    const { user, setUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function loginFormHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const login: LoginData = {
            email,
            password,
        };

        try {
            const response = await axios.post<{}, { data: LoginResponse }>(
                `${RootPath}/auth/login`,
                login,
                {
                    withCredentials: true,
                }
            );
            setLoading(false);
            if (response.data.success && response.data.data) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data)
                );
                setUser(response.data.data);
            }
            navigate("/profile");
        } catch (err) {
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
            <form className="form-style" onSubmit={loginFormHandler}>
                <Logo />
                <InputField
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    name="email"
                    placeholder="Email or UserName"
                    type="text"
                    label="Email"
                    autoComplete="email"
                />
                <InputField
                    value="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
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

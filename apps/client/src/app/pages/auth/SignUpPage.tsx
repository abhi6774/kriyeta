import Container from "../../component/Container";
import { Logo } from "../../component/Logo";
import { useAuthContext } from "../../context/auth.context";
import "../../styles/formstyle.scss";
import axios from "axios";
import { useState } from "react";
import "../../styles/signup.scss"
export default function SignUpPage() {

    const {} = useAuthContext();



    return (
        <Container sx={{ paddingTop: "80px" }}>
            <div className="sign">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => register(e)}
                >
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="p-2 text-lg"
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                    />
                    <input
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                        className="p-2 text-lg"
                        type="text"
                        placeholder="User Name"
                        name="userName"
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 text-lg"
                        type="email"
                        placeholder="Email@.gmail.com"
                        name="email"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 text-lg"
                        type="password"
                        placeholder="Password"
                        name="password"
                    />

                    <p>Profile Picture *</p>

                    <input
                        id="avatarfile"
                        className="p-2 text-lg text-foreground"
                        type="file"
                        placeholder="Avatar"
                        name="avatar"
                    />
                    <button className="w-full" type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </Container>
    );
}

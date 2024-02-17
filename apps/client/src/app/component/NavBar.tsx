import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { useAuthContext } from "../context/auth.context";
import { RootPath } from "../axios.proxy";

const NavBar = () => {
    const { user } = useAuthContext();

    return (
        <div className="navbar">
            <Logo needLink={true} />
            <div style={{ display: "flex", alignItems: "center" }}>
                <Link to={"/editor"}>Write</Link>
                {user ? "" : <Link to={"/signup"}>SignUp</Link>}
                {user ? "" : <Link to={"/login"}>Login</Link>}
                {user ? <Link to={"/profile"}>Profile</Link> : ""}

                {user ? (
                    <a
                        style={{
                            cursor: "pointer",
                            fontSize: "1.5rem",
                            color: "black",
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            localStorage.removeItem("user");
                            fetch(`${RootPath}/auth/logout`, {
                                method: "POST",
                                credentials: "include",
                            }).then((res) => {
                                console.log(res);
                            });
                            window.location.reload();
                        }}
                        dangerouslySetInnerHTML={{
                            __html: `<ion-icon name="exit-outline"></ion-icon>`,
                        }}
                    ></a>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default NavBar;

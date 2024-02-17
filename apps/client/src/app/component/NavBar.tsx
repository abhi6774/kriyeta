import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { useAuthContext } from "../context/auth.context";
const NavBar = () => {
    const { user } = useAuthContext();
    const auth = false;
    return (
        <div className="navbar">
            <Logo needLink={true} />
            <div>
                <Link to={"/editor"}>Write</Link>
                {user ? "" : <Link to={"/signup"}>SignUp</Link>}
                {user ? "" : <Link to={"/login"}>Login</Link>}

                {auth ? <button>LogOut</button> : <></>}
            </div>
        </div>
    );
};

export default NavBar;

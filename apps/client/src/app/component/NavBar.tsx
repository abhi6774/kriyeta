import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";
import { Button } from "./Button";
import { Logo } from "./Logo";
const NavBar = () => {
    const auth = false;
    return (
        <div className="navbar">
            <Logo />
            <div>
                <Link to={"/editor"}>Write</Link>
                <Link to={"/signup"}>Sign</Link>
                <Link to={"/login"}>Login</Link>

                {auth ? <button>LogOut</button> : <></>}
            </div>
        </div>
    );
};

export default NavBar;

import React from "react";
import "../styles/navbar.scss";
import { Link } from "react-router-dom";
import { Button } from "./Button";
const NavBar = () => {
    const auth = false
    return (
        <div className="navbar">
            <h1>sharely !</h1>

            <div>
                <Link to={"/"}>Write</Link>
                <Link to={"/"}>Sign</Link>
                <Link to={"/"}>Login</Link>

                {auth ? <button>LogOut</button> : <></>}
            </div>
        </div>
    );
};

export default NavBar;

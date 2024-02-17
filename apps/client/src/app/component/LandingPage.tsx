import React from "react";
import "../styles/landingpage.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/auth.context";
const LandingPage = () => {
    const { user } = useAuthContext();
    return (
        <div className="landing-page">
            <div className="left">
                <h1>ExpressCompose</h1>
                <h2>
                    Unleash Your Thoughts, Craft Your Story – Where Words Find
                    Their Digital Home!
                </h2>

                <Link
                    className="landing-page-btn"
                    to={user ? "/editor" : "/login"}
                >
                    Start Writing
                </Link>
            </div>
            <div className="right">
                <img
                    src="https://i9innovations.com/assets/images/services/graphic/graphic_design.png"
                    alt=""
                />
            </div>
        </div>
    );
};

export default LandingPage;

import { useEffect, useState } from "react";
import Container from "../../component/Container";
import { useAuthContext } from "../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.scss";

function UnAuthorized() {
    const [remainingTime, setRemainingTime] = useState(10);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prev) => prev - 1);
            if (remainingTime <= 0) {
                clearInterval(interval);
                navigate("/login");
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });
    return (
        <Container
            sx={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80vh",
            }}
        >
            <h3>Unauthorized</h3>
            <p>Please login to access this page</p>
            <span>Redirecting to Login Page within {remainingTime} sec</span>
            <Link className="btn-style" to="/login">
                Go to Login Page
            </Link>
        </Container>
    );
}

export default function Dashboard() {
    const { user } = useAuthContext();
    if (!user) {
        return <UnAuthorized />;
    }
    return <div className="dashbaord-container"></div>;
}

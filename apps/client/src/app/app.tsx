import "./app.scss";

import { Link, Outlet, Route, Routes } from "react-router-dom";
import Container from "./component/Container";
import NavBar from "./component/NavBar";

export function App() {
    return (
        <Container sx={{ minHeight: "100vh", justifyContent: "flex-start"}}>
            <NavBar />
            <Outlet />
        </Container>
    );
}

export default App;

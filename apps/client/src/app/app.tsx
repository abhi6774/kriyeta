import "./app.scss";

import { Link, Outlet, Route, Routes } from "react-router-dom";
import Container from "./component/Container";
import NavBar from "./component/NavBar";

export function App() {
    return (
        <Container>
            <NavBar />
            <Outlet />
        </Container>
    );
}

export default App;

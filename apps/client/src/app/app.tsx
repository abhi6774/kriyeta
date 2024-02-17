import "./app.scss";

import { Route, Routes, Link } from "react-router-dom";
import Container from "./component/Container";
import SmallPostViewer from "./component/SmallPostViewer";
import NavBar from "./component/NavBar";
import LandingPage from "./component/LandingPage";

export function App() {
    return (
        <Container>
<NavBar/>         
<LandingPage/>  
        </Container>
    );
}

export default App;

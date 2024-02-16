import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
} from "react-router-dom";

import App from "./app/app";
import LoginUpPage from "./app/pages/LoginPage";
import SignUpPage from "./app/pages/SignUpPage";
import Container from "./app/component/Container";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    {
        path: "auth",
        children: [
            { path: "login", element: <LoginUpPage /> },
            { path: "signup", element: <SignUpPage /> },
        ],
    },
]);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

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
import LoginUpPage from "./app/pages/auth/LoginPage";
import SignUpPage from "./app/pages/auth/SignUpPage";
import Container from "./app/component/Container";
import { Editor } from "./app/pages/Editor";
import { PostPage } from "./app/pages/PostPage";
import Profile from "./app/pages/Profile";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "editor",
                element: <Editor />,
            },
            {
                path: "post/:id",
                element: <PostPage />,
            },
        ],
    },

    { path: "/login", element: <LoginUpPage /> },
    { path: "signup", element: <SignUpPage /> },
    { path: "/profile", element: <Profile/>}
]);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

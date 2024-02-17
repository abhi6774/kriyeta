import { User } from "@kriyeta/api-interaces";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./app/app";
import LandingPage from "./app/component/LandingPage";
import AuthContext from "./app/context/auth.context";
import { Editor } from "./app/pages/Editor";
import { PostPage } from "./app/pages/PostPage";
import LoginUpPage from "./app/pages/auth/LoginPage";
import SignUpPage from "./app/pages/auth/SignUpPage";
import Profile from "./app/pages/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <LandingPage /> },
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
    { path: "/signup", element: <SignUpPage /> },
    {
        path: "profile",
        element: <Profile />,
    },
]);

export function RouterControllerComponent() {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser: setUser }}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    );
}

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
import { VersionedPage } from "./app/pages/VersionedPage";
import Dashboard from "./app/pages/dashboard/dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <LandingPage /> },
            {
                path: "editor",
                element: <Editor />,
                children: [
                    {
                        path: ":id",
                        element: <Editor />,
                    },
                ],
            },
            {
                path: "post/:id",
                element: <PostPage />,
            },
            {
                path: "post/:id/:version",
                element: <VersionedPage />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "profile/:userName",
                element: <Profile />,
            },
            { path: "/dashboard", element: <Dashboard /> },
        ],
    },
    { path: "/login", element: <LoginUpPage /> },
    { path: "/signup", element: <SignUpPage /> },
]);

export function RouterControllerComponent() {
    const localUser = localStorage.getItem("user");
    const parsedUser = !localUser ? null : (JSON.parse(localUser) as User);
    const [user, setUser] = useState<User | null>(parsedUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    );
}

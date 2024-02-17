import { User } from "@kriyeta/api-interaces";
import React, { useState } from "react";

type AuthContextProps = {
    user: User | null,
    setUser: (user: User) => void;
}
const AuthContext = React.createContext<AuthContextProps>({
    user: null,
    setUser: (user: User) => { }
})

export default AuthContext;

export function useAuthContext() {
    return React.useContext(AuthContext);
}

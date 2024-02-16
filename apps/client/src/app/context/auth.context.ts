import { createContext, useContext } from "react";
import { LoginData, SignUpResponse } from "@kriyeta/api-interaces";
import axios from "axios";
import { RootPath } from "../axios.proxy";

type Response<T, E> = {
    data: T | null;
    error: E | null;
};

type AuthContextProps = {
    signup: (details: FormData) => void;
    login: (details: LoginData) => void;
};

const AuthContext = createContext<AuthContextProps>({
    signup: async (details: FormData) => {
        try {
            const response = await axios.post<{}, SignUpResponse>(
                `${RootPath}/auth/signup`,
                details
            );
            if (!response.success) {
                return { error: response.message, data: null };
            }
            return { error: null, data: response.user };
        } catch (err) {
            console.log(err);
            return { error: err, data: null };
        }
    },
    login: async (details: LoginData) => {},
});

function useAuthContext() {
    return useContext(AuthContext);
}

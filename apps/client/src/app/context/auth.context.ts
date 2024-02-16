import { createContext, useContext } from "react";
import { LoginData, SignUpResponse, User } from "@kriyeta/api-interaces";
import axios from "axios";
import { RootPath } from "../axios.proxy";

type Response<T, E> = {
    data: T | null;
    error: E | null;
};

type AuthContextProps = {
    user: User | null;
    signup: ((details: FormData) => void) | null;
    login: ((details: LoginData) => void) | null;
};

const SignUpFunction = async (details: FormData) => {
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
};

async function LoginFunction(details: LoginData) {}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    signup: SignUpFunction,
    login: LoginFunction,
});

export function useAuthContext() {
    return useContext(AuthContext);
}

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//     return (
//         <AuthContext.Provider
//             value={{
//                 user: null,
//                 signup: SignUpFunction,
//                 login: LoginFunction,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }

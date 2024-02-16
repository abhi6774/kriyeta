export interface SignUpData {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginData {
    email: string;
    password: string;
}

type Response = {
    message: string;
    success: boolean;
};

export type SignUpResponse = Response & {
    user: User | null;
};

export interface User {
    id: string;
    username: string;
    fullname: string;
    email: string;
    password?: string;
    avatar: {
        url: string;
        public_id: string;
    };
}

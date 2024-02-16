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
    data: User | null;
};

export type LoginResponse = Response & {
    data: User;
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

export type Comment = {
    _id: string;
    content: string;
    owner: string;
    post: string;
    commentBy: string;
    createdAt: string;
    updatedAt: string;
    avatar: {
        url: string;
        public_id: string;
    };
    userName: string;
};

export type CommentResponse = Response & { data: Comment[] };

export type Post = {
    _id: string;
    title: string;
    owner: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    image: {
        url: string;
        public_id: string;
    };
    avatar: {
        url: string;
        public_id: string;
    };
    userName: string;
    totalLiked: number;
    totalComment: number;
};

export type PostResponse = Response & { data: Post };

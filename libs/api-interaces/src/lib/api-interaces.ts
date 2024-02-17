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
    totalLiked: number;
    totalComment: number;
};

export type AddPostResponse = Response & {
    data: {
        owner: string;
        title: string;
        content: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
};

export type PostResponse = Response & { data: Post };
export interface VersionResposneData {
    _id: string;
    post: string;
    content: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type GetVersionResponse = Response & {
    data: VersionResposneData;
    message: string;
    success: boolean;
};

export type VersionDataByPost = Omit<VersionResposneData, "content">;
export type GetVersionDataByPost = Response & { data: VersionDataByPost[] };

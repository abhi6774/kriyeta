import { useNavigate, useParams } from "react-router-dom";
import Container from "../component/Container";
import { PostViewer } from "../component/PostViewer";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootPath } from "../axios.proxy";
import { Post, PostResponse } from "@kriyeta/api-interaces";

export function PostPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);

    const id = params.id;

    if (id === "/") {
        navigate("/");
        return;
    }

    async function fetchPost(id: string) {
        try {
            const result = await axios.get<any, PostResponse>(
                `${RootPath}/post/${id}`
            );

            setPost(result.data);
        } catch (err) {}
    }

    useEffect(() => {}, [id]);

    return (
        <Container>
            <PostViewer title="Title" previewContent={id ?? ""} />
        </Container>
    );
}

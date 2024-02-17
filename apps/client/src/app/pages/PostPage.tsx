import { Post, PostResponse } from "@kriyeta/api-interaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootPath } from "../axios.proxy";
import Container from "../component/Container";
import { PostViewer } from "../component/PostViewer";

export function PostPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState<Post | null>(null);

    const id = params.id!;

    if (!id || id === "/") {
        navigate("/");
        return;
    }

    async function fetchPost(id: string) {
        try {
            setLoading(true);
            const result = await axios.get<any, { data: PostResponse }>(
                `${RootPath}/post/${id}`
            );
            setLoading(false);
            setPost(result.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPost(id);
    }, [id]);

    if (loading) {
        return (
            <Container>
                <div
                    style={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h1>Loading...</h1>
                </div>
            </Container>
        );
    }
    if (post === null) {
        return (
            <Container>
                <div
                    style={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h1>Dang Error: 404</h1>
                    <p>Post not found</p>
                </div>
            </Container>
        );
    }

    return (
        <Container sx={{ width: "100%" }}>
            <PostViewer
                author={post.userName}
                createdAt={new Date(post.createdAt)}
                title={post!.title}
                previewContent={post!.content}
            />
        </Container>
    );
}

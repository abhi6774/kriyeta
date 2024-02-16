import { useNavigate, useParams } from "react-router-dom";
import Container from "../component/Container";
import { PostViewer } from "../component/PostViewer";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootPath } from "../axios.proxy";
import { Post, PostResponse } from "@kriyeta/api-interaces";
import MarkdownIt from "markdown-it";

const md = MarkdownIt();

export function PostPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);

    const id = params.id!;

    if ( !id || id === "/") {
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

    useEffect(() => {

        fetchPost(id);
    }, [id]);
    if (post === null) {
        return <Container>
            <div 
            style={{ height:"100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <h1>Dang Error: 404</h1>
                <p>Post not found</p>
            </div>
        </Container>;
    }

    return (
        <Container>
            <PostViewer title={post!.title} previewContent={md.render(post?.content)} />
        </Container>
    );
}

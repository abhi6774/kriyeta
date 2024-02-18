import { useEffect, useState } from "react";
import Container from "../../component/Container";
import { useAuthContext } from "../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.scss";
import SmallPostViewer from "../../component/SmallPostViewer";
import axios from "axios";
import { Post } from "@kriyeta/api-interaces";
import { RootPath } from "../../axios.proxy";

function UnAuthorized() {
    const [remainingTime, setRemainingTime] = useState(10);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prev) => prev - 1);
            if (remainingTime <= 0) {
                clearInterval(interval);
                navigate("/login");
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });
    return (
        <Container
            sx={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80vh",
            }}
        >
            <h3>Unauthorized</h3>
            <p>Please login to access this page</p>
            <span>Redirecting to Login Page within {remainingTime} sec</span>
            <Link className="btn-style" to="/login">
                Go to Login Page
            </Link>
        </Container>
    );
}

export default function Dashboard() {
    const { user } = useAuthContext();
    const [posts, setPosts] = useState<Post[]>([]);
    if (!user) {
        return <UnAuthorized />;
    }

    useEffect(() => {
        const fetchpost = async () => {
            const res = await axios.get<{ data: Post[] }>(`${RootPath}/post`);
            console.log("Post", res);
            if (res.data.data instanceof Array)
                res.data.data.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB.getTime() - dateA.getTime();
                });
            console.log("PostState", posts);
            setPosts(res.data.data);
        };
        fetchpost();
    }, []);
    return (
        <div className="dashbaord-container">
            <div className="lower">
                {posts.map((post) => (
                    <SmallPostViewer
                        content={post.content}
                        title={post.title}
                        userName={post.userName}
                        date={post.createdAt}
                        id={post._id}
                    />
                ))}
            </div>
        </div>
    );
}

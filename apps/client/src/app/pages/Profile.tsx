import { useEffect, useState } from "react";
import SmallPostViewer from "../component/SmallPostViewer";
import "../styles/profile.scss";
import axios from "axios";
import { RootPath } from "../axios.proxy";
import { Post, Profile, ProfileResponse, User } from "@kriyeta/api-interaces";
import { useAuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();
    const { user } = useAuthContext();

    if (!user) {
        navigate("/");
        return <></>;
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const url = `${RootPath}/user/profile/${user.userName}`;
            const res = await axios.get<ProfileResponse>(url);
            console.log(res);
            setProfile(res.data.data);
        };

        const fetchpost = async () => {
            const res = await axios.get(`${RootPath}/post/user/${user._id}`);
            console.log("Post", res);
            console.log("PostState", posts);
            setPosts(res.data.data);
        };
        fetchProfile();
        fetchpost();
    }, []);

    const formatter = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    useEffect(() => {
        if (profile) {
            console.log(profile);
        }
    }, [profile]);

    return (
        <div className="Profile">
            <div className="upper">
                <div
                    style={{
                        width: "120px",
                        height: "120px",
                        background: "var(--secondary)",
                        borderRadius: "50%",
                        boxShadow: "0px 0px 10px 0px var(--secondary)",
                        border: "2px solid white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ fontSize: "4vw", color: "white" }}>
                        {user && user.userName[0].toUpperCase()}
                    </span>
                </div>
                <div>
                    <p style={{ fontWeight: "bold" }}>
                        {profile && profile.fullName}
                    </p>
                    <p style={{ fontSize: "medium" }}>
                        @{profile && profile.userName}
                    </p>
                    <div>
                        <p>{profile && profile.follower} Followers</p>
                        <p>{profile && profile.following} Following</p>
                    </div>
                    <button>Follow</button>
                </div>
            </div>

            <div className="lower">
                {posts.map((post) => (
                    <SmallPostViewer
                        content={post.content}
                        title={post.title}
                        userName={user.fullName}
                        date={post.createdAt}
                        id={post._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;

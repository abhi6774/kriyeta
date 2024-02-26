import { useEffect, useState } from "react";
import SmallPostViewer from "../component/SmallPostViewer";
import "../styles/profile.scss";
import axios from "axios";
import { RootPath } from "../axios.proxy";
import { Post, Profile, ProfileResponse, User } from "@kriyeta/api-interaces";
import { useAuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const params = useParams();
    const userName = params.userName;

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            const url = `${RootPath}/user/profile/${
                userName ? userName : user!.userName
            }`;
            const res = await axios.get(url);
            console.log(res);
            setProfile(res.data.data);
        };

        const fetchpost = async () => {
            const res = await axios.get<{ data: Post[] }>(
                `${RootPath}/post/user/${user?.userName}`
            );
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

    function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSearchValue(e.target.value);
        const filteredPosts = posts.filter((post) =>
            post.title.includes(searchValue)
        );
        setFilteredPosts(filteredPosts);
    }

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
                        aspectRatio: 1 / 1,
                    }}
                >
                    <span style={{ fontSize: "4vw", color: "white" }}>
                        {user && user.userName[0].toUpperCase()}
                    </span>
                </div>
                <div className="user-info">
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
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search Posts"
                        onChange={onSearch}
                    />
                </div>
                <hr />
                {searchValue
                    ? filteredPosts.map((post) => (
                          <SmallPostViewer
                              content={post.content}
                              title={post.title}
                              userName={user!.fullName}
                              date={post.createdAt}
                              id={post._id}
                          />
                      ))
                    : posts.map((post) => (
                          <SmallPostViewer
                              content={post.content}
                              title={post.title}
                              userName={user!.fullName}
                              date={post.createdAt}
                              id={post._id}
                          />
                      ))}
            </div>
        </div>
    );
};

export default ProfilePage;

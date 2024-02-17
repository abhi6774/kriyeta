import { useEffect, useState } from "react";
import SmallPostViewer from "../component/SmallPostViewer";
import "../styles/profile.scss";
import axios from "axios";
import { RootPath } from "../axios.proxy";

const Profile = () => {
    const [profile, setProfile] = useState<any>(null);
    const [post, setPost] = useState<any>([]);
    const userName = "test3";

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await axios.get(`${RootPath}/user/profile/${userName}`);
            setProfile(res.data.data);
        };

        const fetchpost = async () => {
            const res = await axios.get(`${RootPath}/post/`);
            setPost(res.data.data);
            console.log(res);
        };

        fetchProfile();
        fetchpost();
    }, []);

    return (
        <div className="Profile">
            <div className="upper">
                <img
                    src="https://as1.ftcdn.net/v2/jpg/06/34/69/10/1000_F_634691063_xnaGvdlMt25rYoEcEd5xjHAgZkO7aPjB.jpg"
                    alt=""
                />
                <div>
                    <p>@ {profile && profile.userName} r</p>
                    <p>{profile && profile.fullName} </p>
                    <div>
                        <p>{profile && profile.follower} followe</p>
                        <p>{profile && profile.following} following</p>
                    </div>
                    <button>Follow</button>
                </div>
            </div>

            <div className="lower">
                {/* {post.map((i) => (
                    <SmallPostViewer />
                ))} */}
            </div>
        </div>
    );
};

export default Profile;

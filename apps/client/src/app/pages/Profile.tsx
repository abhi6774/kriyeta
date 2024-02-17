import SmallPostViewer from "../component/SmallPostViewer";
import "../styles/profile.scss";

const Profile = () => {
    return (
        <div className="Profile">
            <div className="upper">
                <img
                    src="https://as1.ftcdn.net/v2/jpg/06/34/69/10/1000_F_634691063_xnaGvdlMt25rYoEcEd5xjHAgZkO7aPjB.jpg"
                    alt=""
                />
                <div>
                    <p>@ Anshul_12</p>
                    <p>Anshul choure</p>
                    <div>
                        <p>4 follower</p>
                        <p>5 following</p>
                    </div>
                    <button>Follow</button>
                </div>
            </div>

            <div className="lower">
                <SmallPostViewer />
                <SmallPostViewer />
                <SmallPostViewer />
                <SmallPostViewer />
            </div>
        </div>
    );
};

export default Profile;

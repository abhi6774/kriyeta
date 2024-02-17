import { Link } from "react-router-dom";
import "../styles/smallpostviewer.scss";
import React from "react";

type SmallPostViewerType = {
    userName: string;
    title: string;
    content: string;
    id: string;
    date: string;
};

const SmallPostViewer: React.FC<SmallPostViewerType> = ({
    userName,
    title,
    content,
    id,
    date,
}) => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="smallPost">
            <div>
                <div className="avatar-username-section">
                    <Link
                        to={`/post/${id}`}
                        className="avatar-username-section"
                    >
                        <h1 className="h1-title">{userName}</h1>
                    </Link>
                </div>
                <h1 className="h1-title">{title}</h1>
                <p>{content}</p>

                <div className="date-save-btn">
                    <p>{formatter.format(new Date(date))}</p>
                    <button className="ghost">Save</button>
                </div>
            </div>
        </div>
    );
};

export default SmallPostViewer;

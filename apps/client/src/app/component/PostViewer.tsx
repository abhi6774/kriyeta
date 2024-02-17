import { useState } from "react";
import "../styles/post-view.scss";
import MarkdownIt from "markdown-it";
import { Link, useNavigate } from "react-router-dom";
import { VersionDataByPost } from "@kriyeta/api-interaces";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

type PostPageProps = {
    id: string;
    title: string;
    previewContent: string;
    createdAt: number | Date;
    author?: string;
    version: VersionDataByPost[];
};

const md = new MarkdownIt();

export function PostViewer({
    title,
    previewContent,
    createdAt,
    author,
    version,
    id,
}: PostPageProps) {
    const navigate = useNavigate();
    const [like, setLike] = useState<boolean>();
    const formatter = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    previewContent = md.render(previewContent);

    return (
        <div className="post-view">
            <h1 className="title">{title}</h1>
            <div className="post-info-container">
                <ul className="post-info">
                    {/* <li>Author: {author}</li> */}
                    <li>{formatter.format(createdAt)}</li>
                </ul>
                <div className="btn-container">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/editor/${id}`);
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
            <hr />
            {version.length < 0 ? (
                <div className="version-bar">
                    {version.map((version) => (
                        <Link
                            key={version._id}
                            to={`/post/${version.post}/${version._id}`}
                        >
                            {formatter.format(new Date(version.createdAt))}
                        </Link>
                    ))}
                </div>
            ) : (
                ""
            )}
            <hr />
            {typeof previewContent === "string" ? (
                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                ></div>
            ) : (
                <div ref={previewContent} className="post-content"></div>
            )}
            <hr />
            <div className="like-comment-box">
                <button> {like ? <CiHeart /> : <FaHeart />} </button>
                <button> {like ? <CiHeart /> : <FaHeart />} </button>
            </div>
            <hr />
        </div>
    );
}

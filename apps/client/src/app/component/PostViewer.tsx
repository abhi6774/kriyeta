import { useState } from "react";
import "../styles/post-view.scss";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

type PostPageProps = {
    title: string;
    previewContent: string;
    createdAt: number | Date;
    author: string;
};

export function PostViewer({
    title,
    previewContent,
    createdAt,
    author,
}: PostPageProps) {
    const [like, setLike] = useState<boolean>();
    const formatter = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="post-view">
            <h1 className="title">{title}</h1>
            <ul className="post-info">
                <li>Author: {author}</li>
                <li>{formatter.format(createdAt)}</li>
            </ul>
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
            <button> {like ? <CiHeart /> : <FaHeart />} </button>
            <hr />
        </div>
    );
}

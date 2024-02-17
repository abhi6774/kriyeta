import { useEffect, useState } from "react";
import "../styles/post-view.scss";
import MarkdownIt from "markdown-it";
import { Link, useLocation } from "react-router-dom";
import { VersionDataByPost, VersionResposneData } from "@kriyeta/api-interaces";
type PostPageProps = {
    title: string;
    previewContent: string;
    createdAt: number | Date;
    author?: string;
    version: VersionDataByPost[];
};

const md = new MarkdownIt();

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

export function PostViewer({
    title,
    previewContent,
    createdAt,
    author,
    version,
}: PostPageProps) {
    const formatter = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    previewContent = md.render(previewContent);

    return (
        <div className="post-view">
            <h1 className="title">{title}</h1>
            <ul className="post-info">
                {/* <li>Author: {author}</li> */}
                <li>{formatter.format(createdAt)}</li>
            </ul>
            <hr />
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
            <hr />
            {typeof previewContent === "string" ? (
                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                ></div>
            ) : (
                <div ref={previewContent} className="post-content"></div>
            )}
        </div>
    );
}

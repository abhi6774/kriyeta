import "../styles/post-view.scss";

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
    const formatter = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <div className="post-view">
            <h1>{title}</h1>
            <ul className="post-info">
                <li>Author: {author}</li>
                <li>{formatter.format(createdAt)}</li>
            </ul>
            <hr />
            {typeof previewContent === "string" ? (
                <div
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                ></div>
            ) : (
                <div ref={previewContent} className="preview-content"></div>
            )}
        </div>
    );
}

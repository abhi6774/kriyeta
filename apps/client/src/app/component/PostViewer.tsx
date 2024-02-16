import "../styles/post-view.scss";

export function PostViewer({
    title,
    previewContent,
}: {
    title: string;
    previewContent: string;
}) {
    return (
        <div className="post-view">
            <h1>{title}</h1>
            <ul className="post-info">
                <li>Published By: {}</li>
            </ul>
            <hr></hr>
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

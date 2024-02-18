import { useEffect, useRef, useState } from "react";
import "../styles/editor.scss";
import markdownit from "markdown-it";
import Container from "../component/Container";
import { RootPath } from "../axios.proxy";
import { PostResponse } from "@kriyeta/api-interaces";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../component/Button";
import axios from "axios";

const md = markdownit();

function TitleComponent(props: {
    title: string;
    onChange: (value: string) => void;
    onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="title">
            <input
                onKeyDown={props.onKeyUp}
                required
                type="text"
                value={props.title}
                style={{ border: "none" }}
                placeholder="Enter Page Title"
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
}

function Seperator() {
    return <div className="seperator"></div>;
}

const defaultDemoText = `# Welcome to the Markdown Editor
## This is a simple markdown editor
### You can write your markdown here
#### You can also add images
##### You can also add links
###### You can also add code blocks

\`\`\`javascript
const a = "Hello World";
console.log(a);
\`\`\`

###### You can also add lists
- Item 1
- Item 2
- Item 3

###### You can also add tables

| Name | Age |
| ---- | --- |
| John | 23  |
| Doe  | 24  |

###### You can also add links
[Google](https://www.google.com)
`;

export function Editor() {
    const textAreaElementRef = useRef<HTMLTextAreaElement>(null);
    const previewContent = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const [unparsedText, setUnparsedText] = useState<string>(defaultDemoText);
    const [parsedHtml, setParsedHtml] = useState<string>(
        md.render(unparsedText)
    );

    const params = useParams();
    const postId = params.id;

    useEffect(() => {
        console.log(postId);
        if (postId !== "/" && postId !== undefined && postId !== null)
            axios
                .get<PostResponse>(`${RootPath}/post/${postId}`)
                .then((res) => {
                    const post = res.data.data;
                    console.log(post);
                    if (post) {
                        setTitle(post.title);
                        setUnparsedText(post.content);
                        setParsedHtml(md.render(post.content));
                    }
                    return;
                });
    }, []);

    const [title, setTitle] = useState<string>("");

    function textAreaInputHandler(e: React.FormEvent<HTMLTextAreaElement>) {
        if (e.target === null) return;
        if (unparsedText === null) return;
        const parsed = md.render(unparsedText);
        setParsedHtml(parsed);
    }

    function titleChangeHandler(val: string) {
        console.log(title);
        setTitle(val);
    }

    async function createPost() {
        try {
            console.log(title, unparsedText);

            const res = await axios.post<PostResponse>(
                `${RootPath}/post`,
                {
                    title,
                    content: unparsedText,
                },
                { withCredentials: true }
            );

            if (res.data.data) {
                navigate(`/post/${res.data.data._id}`);
            }
        } catch (err) {
            console.error(err);
        }
    }
    async function updatePost() {
        try {
            console.log(title, unparsedText);

            const res = await axios.post<PostResponse>(
                `${RootPath}/version/editpost/${postId}`,
                {
                    title,
                    content: unparsedText,
                },
                { withCredentials: true }
            );

            if (res.data.data) {
                navigate(`/post/${postId}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="editor-container">
            <div className="btn-container">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        if (
                            postId !== "/" &&
                            postId !== undefined &&
                            postId !== null
                        ) {
                            updatePost();
                            return;
                        }
                        createPost();
                    }}
                >
                    Publish
                </button>
            </div>
            <div className="edi-pre">
                <div className="editor">
                    <TitleComponent
                        onKeyUp={(e) => {
                            console.log(e.key);
                            if (e.key === "Enter") {
                                textAreaElementRef.current?.focus();
                            }
                        }}
                        title={title}
                        onChange={titleChangeHandler}
                    />
                    <textarea
                        name="textarea"
                        ref={textAreaElementRef}
                        onKeyUp={(e) => textAreaInputHandler(e)}
                        value={unparsedText}
                        onChange={(e) => setUnparsedText(e.target.value)}
                    ></textarea>
                </div>
                <div className="preview-container">
                    <h1>{title}</h1>
                    <hr />
                    <div
                        ref={previewContent}
                        className="preview-content"
                        dangerouslySetInnerHTML={{ __html: parsedHtml }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

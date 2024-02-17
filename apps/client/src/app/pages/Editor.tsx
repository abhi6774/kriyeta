import { useEffect, useRef, useState } from "react";
import "../styles/editor.scss";
import markdownit from "markdown-it";
import Container from "../component/Container";
import { RootPath } from "../axios.proxy";
import { PostResponse } from "@kriyeta/api-interaces";
import { useNavigate } from "react-router-dom";
import { Button } from "../component/Button";

const md = markdownit();

function TitleComponent(props: {
    title: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="title">
            <input
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
        md.render(defaultDemoText)
    );
    const [title, setTitle] = useState<string>("");
    const [first, setFirst] = useState(false);

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
            const res = (await (
                await fetch(`${RootPath}/post`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: title,
                        content: unparsedText,
                    }),
                })
            ).json()) as PostResponse;
            if (res.success) {
                navigate(`/post/${res.data._id}`);
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
                        createPost();
                    }}
                >
                    Publish
                </button>
            </div>
            <div className="edi-pre">
                <div className="editor">
                    <TitleComponent
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
                {/* <Seperator /> */}
                <div className="preview-container">
                    <h1>{title}</h1>
                    <hr></hr>
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

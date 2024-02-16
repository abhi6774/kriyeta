import { useEffect, useRef, useState } from "react";
import "../styles/editor.scss";
import markdownit from "markdown-it";
import Container from "../component/Container";

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

function PageImages({}) {
    return (
        <div>
            {/* <button
                onClick={() => {
                    const textArea = textAreaElementRef.current!;
                    const start = textArea.selectionStart;
                    const end = textArea.selectionEnd;
                    const text = textArea.value;
                    const newText = text.slice(0, start) + text.slice(end);
                    setUnparsedText(newText);
                    // textAreaElementRef.current!.value = newText;
                    setParsedHtml(md.render(unparsedText));
                    textArea.focus();
                }}
            >
                Add Image
            </button> */}
            ;
        </div>
    );
}

export function Editor() {
    const textAreaElementRef = useRef<HTMLTextAreaElement>(null);
    const previewContent = useRef<HTMLDivElement>(null);
    const [unparsedText, setUnparsedText] = useState<string>("# TItle");
    const [parsedHtml, setParsedHtml] = useState<string>("");
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

    useEffect(() => {
        previewContent.current!.innerHTML = parsedHtml;
    }, [parsedHtml, unparsedText]);

    return (
        <Container>
            <div className="editor-container">
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
                <Seperator />
                <div className="preview-container">
                    <h1>{title}</h1>
                    <hr></hr>
                    <div ref={previewContent} className="preview-content"></div>
                </div>
            </div>
        </Container>
    );
}

import { useRef, useState } from "react";
import "../styles/inputfield.scss";
import { InputFieldProps } from "../props";

export function InputField(props: InputFieldProps) {
    const [isText, setIsTextState] = useState(false);

    return (
        <div className="inp-field">
            <label htmlFor="inp-field">{props.label}</label>
            <input
                type={isText ? "text" : "password"}
                id="inp-field"
                onChange={props.onChange}
                onFocus={props.onFocus}
            />
            <button>{isText ? "hide" : "show"}</button>
        </div>
    );
}

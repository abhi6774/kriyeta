import { useState } from "react";
import { InputFieldProps } from "../props";
import "../styles/inputfield.scss";

export function InputField(props: InputFieldProps) {
    const [focused, setFocused] = useState(false);
    const id = props.id ? props.id : "inp-field" + props.label;
    return (
        <div className={`inp-field ${focused ? "focused" : ""}`}>
            <label htmlFor={id}>{props.label}</label>
            <input
                type={props.type || "text"}
                id={id}
                name={props.name}
                onChange={props.onChange}
                onFocus={(e) => {
                    setFocused(true);
                    props.onFocus && props.onFocus(e);
                }}
                onBlur={(e) => {
                    setFocused(false);
                }}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
            />
        </div>
    );
}

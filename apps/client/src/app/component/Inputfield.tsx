import { InputFieldProps } from "../props";
import "../styles/inputfield.scss";

export function InputField(props: InputFieldProps) {
    return (
        <div className="inp-field">
            <label htmlFor="inp-field">{props.label}</label>
            <input
                type={props.type || "text"}
                id="inp-field"
                onChange={props.onChange}
                onFocus={props.onFocus}
            />
        </div>
    );
}
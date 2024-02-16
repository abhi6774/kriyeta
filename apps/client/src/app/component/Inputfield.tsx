import "../styles/inputfield.scss";

interface InputFieldProps {
    label: string;
    placeholder: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function InputField(props: InputFieldProps) {
    return (
        <div className="inp-field">
            <label htmlFor="inp-field">Input</label>
            <input
                type={props.type || "text"}
                id="inp-field"
                onChange={props.onChange}
                onFocus={props.onFocus}
            />
        </div>
    );
}

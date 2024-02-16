export type InputFieldProps = {
    label: string;
    placeholder: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export type ButtonProps = {
    name: string;
    onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    classNames?: string[];
};

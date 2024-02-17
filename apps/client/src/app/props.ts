import { ButtonHTMLAttributes } from "react";

export type InputFieldProps = {
    label: string;
    placeholder: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    value: string;
    id?: string;
    autoComplete?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export type ButtonProps = {
    name: string;
    loading?: boolean;
    type?: "submit" | "reset" | "button" | undefined;
    onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    classNames?: string[];
};

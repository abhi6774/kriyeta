import { ButtonHTMLAttributes } from "react";

export type InputFieldProps = {
    label: string;
    placeholder: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    id?: string;
    value: string | number;
    // value:string | number
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

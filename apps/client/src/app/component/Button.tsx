import { ButtonProps } from "../props";
import "../styles/buttonfield.scss";

export function Button(props: ButtonProps) {
    return (
        <button className={"btn"} onClick={props.onClickHandler}>
            {props.name}
        </button>
    );
}

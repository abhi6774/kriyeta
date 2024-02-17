import { ButtonProps } from "../props";
import "../styles/buttonfield.scss";

export function Button(
    props: ButtonProps = { type: "button", name: "Button", loading: false }
) {
    return (
        <button className={"btn"} type="submit" onClick={props.onClickHandler}>
            {props.name}
        </button>
    );
}

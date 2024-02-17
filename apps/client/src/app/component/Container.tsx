import { ReactNode } from "react";
import "../styles/container.scss";

export default function Container({
    children,
    sx,
}: {
    children: ReactNode;
    sx?: React.CSSProperties;
}) {
    sx = sx || {};
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                ...sx,
            }}
            className="container"
        >
            {children}
        </div>
    );
}

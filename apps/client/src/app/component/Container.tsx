import { ReactNode } from "react";
import "../styles/container.scss";

export default function Container({ children }: { children: ReactNode }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
            }}
            className="container"
        >
            {children}
        </div>
    );
}

import { Link } from "react-router-dom";
const AppName = "Rewrite";
export function Logo(
    { needLink, size }: { needLink?: boolean; size?: string | number } = {
        needLink: false,
    }
) {
    return (
        <h1
            style={{
                fontSize: size,
                alignSelf: "center",
            }}
        >
            {needLink ? (
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    {AppName}
                </Link>
            ) : (
                AppName
            )}
        </h1>
    );
}

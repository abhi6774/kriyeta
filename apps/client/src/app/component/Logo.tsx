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
                <a href={"/"} style={{ textDecoration: "none" }}>
                    sharely !
                </a>
            ) : (
                "sharely !"
            )}
        </h1>
    );
}

import { useRef, useState } from "react";
import "../styles/avatarInput.scss";

export function AvatarInput() {
    const ref = useRef<HTMLInputElement>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.item(0);
        if (file) {
            const url = URL.createObjectURL(file);
            console.log(url);
            setAvatarUrl(url);
        }
    }
    return (
        <div onClick={(e) => ref.current!.click()} className="avatarInput">
            {avatarUrl ? (
                <img
                    src={avatarUrl || "https://via.placeholder.com/150"}
                    alt="avatar"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            ) : (
                "A"
            )}
            <input
                name="avatar"
                type="file"
                style={{ display: "none" }}
                ref={ref}
                onChange={onFileChange}
            />
        </div>
    );
}

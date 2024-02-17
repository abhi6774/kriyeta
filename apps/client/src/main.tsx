import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { RouterControllerComponent } from "./router";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <StrictMode>
        <RouterControllerComponent />
    </StrictMode>
);

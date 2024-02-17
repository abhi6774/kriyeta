import { Link } from "react-router-dom";
import "../styles/smallpostviewer.scss";
import React from "react";
type SmallPostViewerType = {
    userName:string,
    title:string,
    content:string
}
const SmallPostViewer:React.FC<SmallPostViewerType> = ({userName,title, content}) => {
    return (
        <div className="smallPost">
            <div>
                <div className="avatar-username-section">
                    <Link
                        to={"/profile/:userName"}
                        className="avatar-username-section"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1707922172778-c59c96446d76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8"
                            alt=""
                        />
                        <h1 className="h1-title">anshul_12</h1>
                    </Link>
                </div>
                <h1 className="h1-title">
                    Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                    ipsum dolor sit amet.
                </h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Iusto quas illum fuga maiores officia incidunt quis natus
                    aliquid quaerat id.Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Iusto quas illum fuga maiores officia
                    incidunt quis natus aliquid quaerat id.
                </p>

                <div className="date-save-btn">
                    <p>jan | 02 | 24</p>
                    <button className="ghost">Save</button>
                </div>
            </div>
            <img
                src="https://images.unsplash.com/photo-1707922172778-c59c96446d76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt=""
            />
        </div>
    );
};

export default SmallPostViewer;

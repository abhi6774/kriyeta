import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "title is required !"],
        },
        image: {
            url: {
                type: String,
            },
            public_id: {
                type: String,
            },
        },
        content: {
            type: String,
            required: [true, "content is required !"],
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;

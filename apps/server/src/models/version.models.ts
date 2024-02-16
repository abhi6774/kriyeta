import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        content: {
            type: String,
            required: [true, "Content is required !"],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Version = mongoose.model("Version", versionSchema);

export default Version;

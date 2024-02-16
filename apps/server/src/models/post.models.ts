import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    onwer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: [true, "content is required !"],
    },
   
}, { 
    timestamps:true
});

const Post = mongoose.model("Post", postSchema);

export default Post;

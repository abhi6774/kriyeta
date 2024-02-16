import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        type:String,
        required:[true, "title is required !"]
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

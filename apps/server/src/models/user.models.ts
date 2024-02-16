import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User Name is required !"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    fullName: {
        type: String,
        required: [true, "full Name is required !"],
    },
    email: {
        type: String,
        required: [true, "Email is required !"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required !"],
    },
    avatar: {
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
    },
}, { timestamps:true});

const User = mongoose.model("User", userSchema);

export default User;
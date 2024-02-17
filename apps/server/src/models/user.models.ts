import mongoose from "mongoose";
import bcrypt from "bcrypt";

type UserSchema = {
    checkPassword: () => void;
    userName: string;
    fullName: string;
    email: string;
    password: string;
    // avatar: {
    //     url: string,
    //     public_id: string
    // }

};
const userSchema = new mongoose.Schema<UserSchema>(
    {
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
            minLength: [4, "password contain minimun 4 letters"],
            // maxLength: [8, "password contain maximun 8 letters"],
        },
        // avatar: {
        //     url: {
        //         type: String,
        //         default:
        //             "data:image/jpeg;base64,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",
        //     },
        //     public_id: {
        //         type: String,
        //     },
        // },
    },

    { timestamps: true }
);


userSchema.pre("save", async function(next){
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,10) 
    }
    next();
})  



const User = mongoose.model("User", userSchema);

export default User;
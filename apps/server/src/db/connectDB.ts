import mongoose from "mongoose";


async function connectDb() {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);

        console.log("mongo db connected on :: ", connection.host);
    } catch (error) {
        console.log("mongo db connection FAILED :: ", error);
    }
}

export default connectDb;

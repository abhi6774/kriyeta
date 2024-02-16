import mongoose from "mongoose";


async function connectDb() {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL);

        console.log("mongo db connected on host :: ", connection.host);
    } catch (error) {
        console.log("mongo db connection FAILED :: ", error);
    }
}

export default connectDb;

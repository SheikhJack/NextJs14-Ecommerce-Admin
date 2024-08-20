import mongoose from "mongoose";


let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        const mongoURI = process.env.MONGO_URL || "";
        if (!mongoURI) {
            throw new Error("MONGODB_URL is not defined in the environment");
        }

        await mongoose.connect(mongoURI, {
            dbName: "Mich_Store",
            
        });

        isConnected = true;
        console.log("MongoDB is connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

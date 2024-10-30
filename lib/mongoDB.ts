import mongoose from "mongoose";


let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
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
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

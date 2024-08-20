import mongoose from "mongoose";



const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description : String,
    image: {
        type: String,
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

// first, we go to models, and find collection model, if theres nothing, create a model and name it Collection using collectionschema
 const Collection = mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

 export default Collection;
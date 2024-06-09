import mongoose, { Schema, model, Types } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        min: 3,
        max: 20,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    image: {
        id: { type: String, required: true },
        url: { type: String, required: true }
    },
    addedBy: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


const categoryModel = mongoose.models.Category || model("Category", categorySchema)

export default categoryModel;
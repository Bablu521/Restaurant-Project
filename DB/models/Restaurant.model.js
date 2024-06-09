import mongoose, { Schema, model, Types } from "mongoose";

const restaurantSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        min: 2,
        max: 20,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        min: 10,
        max: 200,
    },
    image: { id: { type: String, required: true }, url: { type: String, required: true } },
    categoryId: [
        {
            type: Types.ObjectId,
            ref: "Category",
            required: true
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    workingTime: String,
    pickUp: {
        type: Boolean,
        default: true
    },
    delievery: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
    location: {
        type: String,
        trim: true,
        min: 5,
        max: 100,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

restaurantSchema.virtual("foods", {
    ref: "Food",
    localField: "_id",
    foreignField: "restaurantId",
})


const restaurantModel = mongoose.models.Restaurant || model("Restaurant", restaurantSchema)

export default restaurantModel;
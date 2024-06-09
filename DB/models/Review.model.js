import mongoose, { Schema, model, Types } from "mongoose";

const reviewSchema = new Schema({
    foodRating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    restaurantRating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    foodId: {
        type: Types.ObjectId,
        ref: "Food",
        required: true
    },
    orderId: {
        type: Types.ObjectId,
        ref: "Order",
        required: true
    }
}, { timestamps: true })

const reviewModel = mongoose.models.Review || model("Review", reviewSchema)

export default reviewModel;
import mongoose, { Schema, model, Types } from "mongoose";

const cartSchema = new Schema({
    foods: [
        {
            foodId: {
                type: Types.ObjectId,
                ref: "Food",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
})

const cartModel = mongoose.models.Cart || model("Cart", cartSchema)

export default cartModel;
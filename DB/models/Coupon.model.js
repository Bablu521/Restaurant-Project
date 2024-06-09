import mongoose, { Schema, model, Types } from "mongoose";

const couponSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    discount: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    expiredAt: {
        type: Date,
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
})

const couponModel = mongoose.models.Coupon || model("Coupon", couponSchema)

export default couponModel;
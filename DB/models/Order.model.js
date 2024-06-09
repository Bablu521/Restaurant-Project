import mongoose, { Schema, model, Types } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    foods: [{
        foodId: {
            type: Types.ObjectId,
            ref: "Food",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        itemPrice: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        }
    }],
    price: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        required: true,
        enum: ["cash", "visa"],
        default: "cash"
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["preparing", "ready", "onTheWay", "delivered", "cancelled", "visaPaid", "failedToPay"],
        default: "preparing"
    },
    invoice: {
        url: { type: String, },
        id: { type: String, },
    },
    coupon: {
        id: { type: Types.ObjectId, ref: "Coupon", },
        name: { type: String },
        discount: { type: Number, min: 1, max: 100 }

    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

orderSchema.virtual("finalPrice").get(function () {
    return this.coupon ? Number.parseFloat(
        this.price - (this.price * this.coupon.discount) / 100
    ).toFixed(2) : this.price
})

const orderModel = mongoose.models.Order || model("Order", orderSchema)

export default orderModel;
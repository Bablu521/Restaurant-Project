import mongoose, { Schema, model, Types } from "mongoose";

const foodSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        min: 3,
        max: 30
    },
    description: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 200,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    image: { id: { type: String, required: true }, url: { type: String, required: true } },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category",
        required: true,
    },
    restaurantId: {
        type: Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }, strictQuery: true })

//queryHelper
foodSchema.query.search = function (keyword) {
    if (keyword) {
        return this.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        })
    }
    return this
}

//queryHelper
foodSchema.query.paginate = function (page) {
    page = page < 1 || isNaN(page) || !page ? 1 : page
    const limit = 2
    const skip = limit * (page - 1)
    return this.skip(skip).limit(limit)
}


const foodModel = mongoose.models.Food || model("Food", foodSchema)

export default foodModel;
import mongoose, { Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    role: {
        type: String,
        required: true,
        enum: ["client", "admin", "rest-owner"],
        default: "client"
    },
    status: {
        type: String,
        required: true,
        enum: ["online", "offline"],
        default: "offline"
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    OTP: Number,
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

userSchema.pre("save",
    function () {
        if (this.isModified("password")) {
            return this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALT_ROUND))
        }
    })


const userModel = mongoose.models.User || model("User", userSchema)

export default userModel;
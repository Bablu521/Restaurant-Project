import couponModel from "../../../DB/models/Coupon.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import randomstring from 'randomstring';


//createCoupon
export const createCoupon = asyncHandler(async (req, res, next) => {
    const { discount, expiredAt } = req.body
    const name = randomstring.generate({
        length: 5,
        charset: 'alphanumeric'
    })
    const coupon = await couponModel.create({
        name,
        discount,
        expiredAt,
        createdBy: req.user._id
    })
    return res.status(201).json({ message: "Done", coupon })
})

//updateCoupon
export const updateCoupon = asyncHandler(async (req, res, next) => {
    const coupon = await couponModel.findById(req.params.id)
    if (!coupon) {
        return next(new Error("Coupon Not Found", { cause: 404 }))
    }
    if (req.user._id.toString() != coupon.createdBy.toString()) {
        return next(new Error("You are not allowed to Update this Coupon", { cause: 403 }))
    }
    coupon.discount = req.body.discount ? req.body.discount : coupon.discount;
    coupon.expiredAt = req.body.expiredAt ? req.body.expiredAt : coupon.expiredAt;
    await coupon.save()
    return res.status(200).json({ message: "Done", coupon })
})

//deleteCoupon
export const deleteCoupon = asyncHandler(async (req, res, next) => {
    const coupon = await couponModel.findById(req.params.id)
    if (!coupon) {
        return next(new Error("Coupon Not Found", { cause: 404 }))
    }
    if (req.user._id.toString() != coupon.createdBy.toString()) {
        return next(new Error("You are not allowed to Delete this Coupon", { cause: 403 }))
    }
    await coupon.deleteOne()
    return res.status(200).json({ message: "Done" })
})

//getAllCoupons
export const getAllCoupons = asyncHandler(async (req, res, next) => {
    if (req.user.role == "admin") {
        const coupons = await couponModel.find()
        if (!coupons.length) {
            return next(new Error("No Coupons Found", { cause: 404 }))
        }
        return res.status(200).json({ message: "Done", coupons })
    }
    if (req.user.role == "rest-owner") {
        const coupons = await couponModel.find({ createdBy: req.user._id })
        if (!coupons.length) {
            return next(new Error("No Coupons Found", { cause: 404 }))
        }
        return res.status(200).json({ message: "Done", coupons })
    }
})
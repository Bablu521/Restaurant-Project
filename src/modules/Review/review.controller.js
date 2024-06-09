import reviewModel from "../../../DB/models/Review.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import orderModel from './../../../DB/models/Order.model.js';
import { calcuateRating } from "./review.service.js";

//addReview
export const addReview = asyncHandler(async (req, res, next) => {
    const { foodId } = req.params
    const { foodRating, restaurantRating, comment } = req.body
    const order = await orderModel.findOne({ userId: req.user._id, "foods.foodId": foodId, status: "delivered" })
    if (!order) {
        return next(new Error("can't Review this Food", { cause: 404 }))
    }
    const checkPreviousReview = await reviewModel.findOne({ createdBy: req.user._id, foodId, orderId: order._id })
    if (checkPreviousReview) {
        return next(new Error("You have already reviewed this Food", { cause: 409 }))
    }
    const review = await reviewModel.create({
        foodRating,
        restaurantRating,
        comment,
        createdBy: req.user._id,
        foodId,
        orderId: order._id
    })
    calcuateRating(foodId)
    return res.status(201).json({ message: "Done", review })
})


//updateReview
export const updateReview = asyncHandler(async (req, res, next) => {
    const { foodId, id } = req.params
    const review = await reviewModel.findOne({ _id: id, foodId })
    if (!review) {
        return next(new Error("Review Not Found", { cause: 404 }))
    }
    if (review.createdBy.toString() != req.user._id.toString()) {
        return next(new Error("You are not allowed to update this Review", { cause: 403 }))
    }
    review.foodRating = req.body.foodRating ? req.body.foodRating : review.foodRating
    review.restaurantRating = req.body.restaurantRating ? req.body.restaurantRating : review.restaurantRating
    review.comment = req.body.comment ? req.body.comment : review.comment
    await review.save()
    if (req.body.foodRating || req.body.restaurantRating) {
        calcuateRating(foodId)
    }
    return res.status(200).json({ message: "Done", review })
})

//deleteReview
export const deleteReview = asyncHandler(async (req, res, next) => {
    const { foodId, id } = req.params
    const review = await reviewModel.findOne({ _id: id, foodId })
    if (!review) {
        return next(new Error("Review Not Found", { cause: 404 }))
    }
    if (review.createdBy.toString() != req.user._id.toString()) {
        return next(new Error("You are not allowed to delete this Review", { cause: 403 }))
    }
    await review.deleteOne()
    calcuateRating(foodId)
    return res.status(200).json({ message: "Done", review })
})


//getReviews
export const getReviews = asyncHandler(async (req, res, next) => {
    const { foodId } = req.params
    if (!foodId) {
        return next(new Error("Food ID is required", { cause: 404 }))
    }
    const reviews = await reviewModel.find({ foodId })
    if (!reviews.length) {
        return next(new Error("No Reviews Found", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", reviews })
})
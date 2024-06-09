import joi from 'joi'
import { validObjectId } from '../../middlewares/validation.js'

//addReview
export const addReview = joi.object({
    foodId: joi.string().custom(validObjectId).required(),
    foodRating: joi.number().min(1).max(5).integer().positive().required(),
    restaurantRating: joi.number().min(1).max(5).integer().positive().required(),
    comment: joi.string().required(),
}).required()

//updateReview
export const updateReview = joi.object({
    foodId: joi.string().custom(validObjectId).required(),
    id: joi.string().custom(validObjectId).required(),
    foodRating: joi.number().min(1).max(5).integer().positive(),
    restaurantRating: joi.number().min(1).max(5).integer().positive(),
    comment: joi.string(),
}).required()

//deleteReview
export const deleteReview = joi.object({
    foodId: joi.string().custom(validObjectId).required(),
    id: joi.string().custom(validObjectId).required()
}).required()


//getReviews
export const getReviews = joi.object({
    foodId: joi.string().custom(validObjectId).required()
}).required()
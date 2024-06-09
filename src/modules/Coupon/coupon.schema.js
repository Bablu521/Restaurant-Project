import joi from 'joi'
import { validObjectId } from '../../middlewares/validation.js'

//createCoupon
export const createCoupon = joi.object({
    discount: joi.number().integer().positive().min(1).max(100).required(),
    expiredAt: joi.date().greater(Date.now()).required()
}).required()

//updateCoupon
export const updateCoupon = joi.object({
    id: joi.string().custom(validObjectId).required(),
    discount: joi.number().integer().positive().min(1).max(100),
    expiredAt: joi.date().greater(Date.now())
}).required()

//deleteCoupon
export const deleteCoupon = joi.object({
    id: joi.string().custom(validObjectId).required()
}).required()
import joi from "joi"
import { validObjectId } from "../../middlewares/validation.js"

//createCashOrder
export const createCashOrder = joi.object({
    phone: joi.string().required(),
    address: joi.string().required(),
    payment: joi.string().valid("cash").required(),
    coupon: joi.string()
}).required()

//createVisaOrder
export const createVisaOrder = joi.object({
    phone: joi.string().required(),
    address: joi.string().required(),
    payment: joi.string().valid("visa").required(),
    coupon: joi.string()
}).required()

//cancelOrder
export const cancelOrder = joi.object({
    id: joi.string().custom(validObjectId).required(),
}).required()
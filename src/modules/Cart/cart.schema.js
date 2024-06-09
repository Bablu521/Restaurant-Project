import joi from 'joi'
import { validObjectId } from './../../middlewares/validation.js';

//addToCart
export const addToCart = joi.object({
    foodId: joi.string().custom(validObjectId).required(),
    quantity: joi.number().min(1).integer().positive().required()
}).required()

//updateCart
export const updateCart = joi.object({
    foodId: joi.string().custom(validObjectId).required(),
    quantity: joi.number().min(1).integer().positive().required()
}).required()

//removeFromCart
export const removeFromCart = joi.object({
    foodId: joi.string().custom(validObjectId).required()
}).required();

//getCart
export const getCart = joi.object({
    cartId: joi.string().custom(validObjectId)
}).required()


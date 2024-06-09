import joi from 'joi'
import { validObjectId } from '../../middlewares/validation.js'

//createFood
export const createFood = joi.object({
    restaurantId: joi.string().custom(validObjectId).required(),
    categoryId: joi.string().custom(validObjectId).required(),
    title: joi.string().min(3).max(30).required(),
    description: joi.string().min(10).max(100),
    price: joi.number().integer().positive().required()
}).required()


//updateFood
export const updateFood = joi.object({
    restaurantId: joi.string().custom(validObjectId).required(),
    id: joi.string().custom(validObjectId).required(),
    title: joi.string().min(3).max(30),
    description: joi.string().min(10).max(100),
    price: joi.number().integer().positive()
}).required()


//deleteFood
export const deleteFood = joi.object({
    restaurantId: joi.string().custom(validObjectId).required(),
    id: joi.string().custom(validObjectId).required()
}).required()

//getAllFoods
export const getAllFoods = joi.object({
    restaurantId: joi.string().custom(validObjectId)
}).required()

//searchFood
export const searchFood = joi.object({
    restaurantId: joi.string().custom(validObjectId)
}).required()
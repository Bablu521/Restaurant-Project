import joi from 'joi';
import { validObjectId } from '../../middlewares/validation.js';

//createCategory
export const createCategory = joi.object({
    title: joi.string().min(3).max(20).required()
}).required()


//updateCategory
export const updateCategory = joi.object({
    title: joi.string().min(3).max(20),
    id: joi.string().custom(validObjectId).required()
}).required()


//deleteCategory
export const deleteCategory = joi.object({
    id: joi.string().custom(validObjectId).required()
}).required()

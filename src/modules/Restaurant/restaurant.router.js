import { Router } from "express";
const router = Router()
import * as restaurantController from './restaurant.controller.js'
import * as restaurantSchema from './restaurant.schema.js'
import { validation } from '../../middlewares/validation.js'
import { isAuthenticated } from './../../middlewares/authentication.js';
import { isAuthorized } from './../../middlewares/authorization.js';
import { fileUpload, fileValidation } from './../../utils/multer.js';
import foodRouter from '../Food/food.router.js'

//food
router.use("/:restaurantId/food", foodRouter)

//createReastaurant
router.post("/", isAuthenticated, isAuthorized("rest-owner"), fileUpload(fileValidation.image).single("restaurant"), validation(restaurantSchema.createReastaurant), restaurantController.createReastaurant)

//updateReastaurant
router.put("/:id", isAuthenticated, isAuthorized("rest-owner"), fileUpload(fileValidation.image).single("restaurant"), validation(restaurantSchema.updateReastaurant), restaurantController.updateReastaurant)

//deleteReastaurant
router.delete("/:id", isAuthenticated, isAuthorized("rest-owner"), validation(restaurantSchema.deleteReastaurant), restaurantController.deleteReastaurant)

//getAllRestaurant
router.get("/", restaurantController.getAllRestaurants)

//searchRestaurant
router.get("/search", validation(restaurantSchema.searchRestaurant), restaurantController.searchRestaurant)



export default router
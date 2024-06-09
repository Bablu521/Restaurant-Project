import { Router } from "express";
const router = Router({ mergeParams: true });
import * as foodController from './food.controller.js'
import * as foodSchema from './food.schema.js'
import { validation } from '../../middlewares/validation.js'
import { isAuthenticated } from './../../middlewares/authentication.js';
import { isAuthorized } from './../../middlewares/authorization.js';
import { fileUpload, fileValidation } from './../../utils/multer.js';
import reviewRouter from "../Review/review.router.js"

router.use("/:foodId/review", reviewRouter)

//createFood
router.post("/", isAuthenticated, isAuthorized("rest-owner"), fileUpload(fileValidation.image).single("food"), validation(foodSchema.createFood), foodController.createFood)

//updateFood
router.put("/:id", isAuthenticated, isAuthorized("rest-owner"), fileUpload(fileValidation.image).single("food"), validation(foodSchema.updateFood), foodController.updateFood)

//deleteFood
router.delete("/:id", isAuthenticated, isAuthorized("rest-owner"), validation(foodSchema.deleteFood), foodController.deleteFood)

//getAllFoods
router.get("/", foodController.getAllFoods)

//searchFood
router.get("/search", foodController.searchFood)




export default router
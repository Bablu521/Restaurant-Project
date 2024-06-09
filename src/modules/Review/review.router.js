import { Router } from "express";
const router = Router({ mergeParams: true })
import * as reviewController from './review.controller.js'
import * as reviewSchema from './review.schema.js'
import { validation } from '../../middlewares/validation.js'
import { isAuthenticated } from '../../middlewares/authentication.js';
import { isAuthorized } from '../../middlewares/authorization.js';

//addReview
router.post("/", isAuthenticated, isAuthorized("client"), validation(reviewSchema.addReview), reviewController.addReview);

//updateReview
router.put("/:id", isAuthenticated, isAuthorized("client"), validation(reviewSchema.updateReview), reviewController.updateReview)

//deleteReview
router.delete("/:id", isAuthenticated, isAuthorized("client"), validation(reviewSchema.deleteReview), reviewController.deleteReview)

//getReviews
router.get("/", reviewController.getReviews)

export default router
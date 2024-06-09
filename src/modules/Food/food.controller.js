import categoryModel from "../../../DB/models/Category.model.js";
import foodModel from "../../../DB/models/Food.model.js";
import restaurantModel from "../../../DB/models/Restaurant.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";


//createFood
export const createFood = asyncHandler(async (req, res, next) => {
    const restaurant = await restaurantModel.findById(req.params.restaurantId)
    if (!restaurant) {
        return next(new Error("Restaurant Not Found", { cause: 404 }))
    }
    const Category = await categoryModel.findById(req.body.categoryId)
    if (!Category) {
        return next(new Error("Category Not Found", { cause: 404 }))
    }
    if (req.user._id.toString() != restaurant.owner.toString()) {
        return next(new Error("You are not allowed to add food to this restaurant", { cause: 403 }))
    }
    if (!req.file) {
        return next(new Error("Food Image is required", { cause: 404 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `Restaurant/${restaurant.title}/Food` })
    const food = await foodModel.create({
        ...req.body,
        image: { url: secure_url, id: public_id },
        restaurantId: restaurant._id,
    })
    return res.status(201).json({ message: "Done", food })
})


//updateFood
export const updateFood = asyncHandler(async (req, res, next) => {
    const food = await foodModel.findOne({ _id: req.params.id, restaurantId: req.params.restaurantId })
    if (!food) {
        return next(new Error("Food Not Found or InValid Restaurant", { cause: 404 }))
    }
    const checkOwner = await restaurantModel.findOne({ owner: req.user._id })
    if (!checkOwner) {
        return next(new Error("you are not allowed to Update this Food", { cause: 403 }))
    }
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { public_id: food.image.id })
        food.image = { url: secure_url, id: public_id }
    }
    food.title = req.body.title ? req.body.title : food.title
    food.description = req.body.description ? req.body.description : food.description
    food.price = req.body.price ? req.body.price : food.price
    await food.save()
    return res.status(200).json({ message: "Done", food })
})


//deleteFood
export const deleteFood = asyncHandler(async (req, res, next) => {
    const food = await foodModel.findOne({ _id: req.params.id, restaurantId: req.params.restaurantId })
    if (!food) {
        return next(new Error("Food Not Found or InValid Restaurant", { cause: 404 }))
    }
    const checkOwner = await restaurantModel.findOne({ owner: req.user._id })
    if (!checkOwner) {
        return next(new Error("you are not allowed to Delete this Food", { cause: 403 }))
    }
    await food.deleteOne()
    await cloudinary.uploader.destroy(food.image.id)
    return res.status(200).json({ message: "Done" })
})

//getAllFoods
export const getAllFoods = asyncHandler(async (req, res, next) => {
    if (req.params.restaurantId == undefined) {
        const foods = await foodModel.find().populate([
            {
                path: "restaurantId",
                select: "title"
            }
        ])
        if (!foods.length) {
            return next(new Error("No Foods Found", { cause: 404 }))
        }
        return res.status(200).json({ message: "Done", foods })
    }
    const foods = await foodModel.find({ restaurantId: req.params.restaurantId })
    if (!foods.length) {
        return next(new Error("No Foods Found", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", foods })
})


//searchFood
export const searchFood = asyncHandler(async (req, res, next) => {
    const { sort, page, keyword } = req.query
    if (req.params.restaurantId == undefined) {
        const foods = await foodModel.find({ ...req.query }).sort(sort).search(keyword).paginate(page)
        if (!foods.length) {
            return next(new Error("No Foods Found", { cause: 404 }))
        }
        return res.status(200).json({ message: "Done", foods })
    }
    const foods = await foodModel.find({ restaurantId: req.params.restaurantId, ...req.query }).sort(sort).search(keyword).paginate(page)
    if (!foods.length) {
        return next(new Error("No Foods Found", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", foods })
})
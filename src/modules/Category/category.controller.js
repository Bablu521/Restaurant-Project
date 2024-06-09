import { asyncHandler } from "../../utils/errorHandling.js";
import cloudinary from './../../utils/cloudinary.js';
import categoryModel from './../../../DB/models/Category.model.js';

//createCategory
export const createCategory = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        return next(new Error("Category Image is required", { cause: 404 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: "Restaurant/Category" })
    const checkTitle = await categoryModel.findOne({ title: req.body.title.toLowerCase() })
    if (checkTitle) {
        return next(new Error("Category with this title already exists", { cause: 409 }))
    }
    const category = await categoryModel.create({
        title: req.body.title.toLowerCase(),
        image: { url: secure_url, id: public_id },
        addedBy: req.user._id
    })

    return res.status(201).json({ message: "Done", category })
})

//updateCategory
export const updateCategory = asyncHandler(async (req, res, next) => {
    const category = await categoryModel.findById(req.params.id)
    if (!category) {
        return next(new Error("Category Not Found", { cause: 404 }))
    }
    if (req.user._id.toString() != category.addedBy.toString()) {
        return next(new Error("You are not allowed to update this category", { cause: 403 }))
    }
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { public_id: category.image.id })
        category.image = { url: secure_url, id: public_id }
    }
    if (req.body.title) {
        const checkTitle = await categoryModel.findOne({ title: req.body.title.toLowerCase() })
        if (checkTitle) {
            return next(new Error("Category with this title already exists", { cause: 409 }))
        }
        category.title = req.body.title.toLowerCase()
    }
    await category.save()
    return res.status(200).json({ message: "Done", category })
})


//deleteCategory
export const deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await categoryModel.findById(req.params.id)
    if (!category) {
        return next(new Error("Category Not Found", { cause: 404 }))
    }
    if (req.user._id.toString() != category.addedBy.toString()) {
        return next(new Error("You are not allowed to delete this category", { cause: 403 }))
    }
    await category.deleteOne()
    await cloudinary.uploader.destroy(category.image.id)
    return res.status(200).json({ message: "Done" })
})

//getAllCategories
export const getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await categoryModel.find()
    if (!categories.length) {
        return next(new Error("No Categories Found", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", categories })
})


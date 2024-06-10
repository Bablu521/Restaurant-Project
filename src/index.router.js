import connectDB from "../DB/connection.js"
import { globalErrorHandling } from "./utils/errorHandling.js"
import cors from "cors"
import authRouter from "./modules/Auth/auth.router.js"
import reviewRouter from "./modules/Review/review.router.js"
import restaurantRouter from "./modules/Restaurant/restaurant.router.js"
import orderRouter from "./modules/Order/order.router.js"
import foodRouter from "./modules/Food/food.router.js"
import categoryRouter from "./modules/Category/category.router.js"
import cartRouter from "./modules/Cart/cart.router.js"
import couponRouter from "./modules/Coupon/coupon.router.js"

const initApp = (app, express) => {
    connectDB()
    app.use(cors())

    app.use((req, res, next) => {
        if (req.originalUrl == "/order/webhook") {
            return next()
        }
        express.json()(req, res, next)
    })

    app.get("/", (req, res, next) => {
        return res.status(200).json({ message: "Welcome to Restaurant Project" })
    })

    app.use("/auth", authRouter)
    app.use("/category", categoryRouter)
    app.use("/restaurant", restaurantRouter)
    app.use("/food", foodRouter)
    app.use("/cart", cartRouter)
    app.use("/coupon", couponRouter)
    app.use("/order", orderRouter)
    app.use("/review", reviewRouter)



    app.use("*", (req, res, next) => {
        return res.status(404).json({ message: "IN-VALID ROUTING" })
    })

    app.use(globalErrorHandling)
}



export default initApp;
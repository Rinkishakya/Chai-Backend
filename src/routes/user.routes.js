import Router from "express"
import userController from "../controllers/user.controller.js"
const { registerUser, login } = userController;
import upload from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avtar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        },
    ]),
    registerUser)

router.route("/login").post(login)

export default router;



import {Router} from "express"
import userController from "../controllers/user.controller.js"
import upload from "../middlewears/multer.middleware.js";

const { registerUser, login } = userController;
const router = Router();

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



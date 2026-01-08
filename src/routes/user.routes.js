import Router from "express"
import userController from "../controllers/user.controller.js"
const {registerUser, login} = userController;

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(login)

export default router;
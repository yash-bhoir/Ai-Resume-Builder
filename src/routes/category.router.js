import { Router } from "express";
import {  addCategory, deleteCategory, updateCategory ,getCategoryByUser } from "../controllers/category.controller.js";
// import {upload} from "../middlewares/multer.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/addCategory").post(addCategory);
router.route("/deleteCategory").post(deleteCategory);
router.route("/editCategory").post(updateCategory);
router.route("/getCategoryByUsers").post(getCategoryByUser);

export default router;

import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js"
import {addProduct , deleteProduct, editProduct} from "../controllers/product.controller.js"

const router = Router();

router.route("/addProduct").post(addProduct);
router.route("/deleteProduct").post(deleteProduct);
router.route("/editProduct").post(editProduct);


export default router;

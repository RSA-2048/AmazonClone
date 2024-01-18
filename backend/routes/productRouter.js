import express from "express";
// import seedData from "../controllers/seedController.js";
import getProducts from "../controllers/productController.js"

const productRouter = express.Router();
productRouter.get('/', getProducts);

export default productRouter;
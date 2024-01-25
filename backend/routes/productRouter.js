import express from "express";
// import seedData from "../controllers/seedController.js";
import { getProducts, getProductById } from "../controllers/productController.js";
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();
productRouter.get('/', getProducts);
productRouter.get('/:id', expressAsyncHandler(getProductById));

export default productRouter;
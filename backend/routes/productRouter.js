import express from "express";
// import seedData from "../controllers/seedController.js";
import { getProducts, getProductById, getProductByToken, getCategories, getProductsByQuery } from "../controllers/productController.js";
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/categories', expressAsyncHandler(getCategories));
productsRouter.get("/search", expressAsyncHandler(getProductsByQuery));
productRouter.get('/token/:token', expressAsyncHandler(getProductByToken));
productRouter.get('/:id', expressAsyncHandler(getProductById));



export default productRouter;
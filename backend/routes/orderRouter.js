import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import { addOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(addOrder));

export default orderRouter;


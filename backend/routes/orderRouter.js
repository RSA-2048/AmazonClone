import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(addOrder));

export default orderRouter;


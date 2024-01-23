import express from "express";
import expressAsyncHandler from "express-async-handler";
import { signup, signin } from "../controllers/usersController.js";

const usersRouter = express.Router();
//usersRouter.get('/', getUsers);
usersRouter.post('/signin', expressAsyncHandler(signin));
usersRouter.post('/signup', expressAsyncHandler(signup));

export default usersRouter;
import express from "express";
import {
  userRegisterControl,
  userLoginControl,
  userUpdateTshirtColorControl,
} from "../controller/userControl.js";

const userRouter = express.Router();

userRouter.post("/register", userRegisterControl);
userRouter.post("/login", userLoginControl);
userRouter.post("/updateColor", userUpdateTshirtColorControl);

export default userRouter;

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/Users.js";
import dotenv from "dotenv";

dotenv.config();

const userRegisterControl = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      console.log("User already exists!");
      return res.status(409).json({
        message: `User with email ${email} already exists!`,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("User Registered Successfully!!");
    return res.status(201).json({
      message: "User Registered Successfully!!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some error occurred. Please try again.",
      success: false,
    });
  }
};

const userLoginControl = async (req, res) => {
  const { email, password } = req.body;

  // check User's existence
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log(`User doesn't exist!`);
      return res.json({
        message: `User with email id ${email} does not exist!`,
        success: false,
      });
    }

    // Check for password validity
    const passwordValid = await bcrypt.compare(password, user?.password);

    if (!passwordValid) {
      console.log("password doesn't match!");
      return res.json({
        message: "Password doesn't match. Recheck Email and Password!",
        success: false,
      });
    }

    // create jwt token
    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET);

    console.log("User LoggedIn Successfully!!");
    return res.json({
      token,
      userID: user?._id,
      tshirtColor: user?.tshirtColor,
      logo: user?.logo,
      message: "User LoggedIn Successfully!!",
      success: true,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.json({
      message: "Some error occured please try again!",
      success: false,
    });
  }
};

const userUpdateTshirtColorControl = async (req, res) => {
  const token = req.body?.token;
  const userID = jwt.decode(token, process.env.JWT_SECRET);
 console.log(req.body);

  try {
    const user = await userModel.findById(userID.id);

    if (!user) {
      console.log("User not found!");
      return res.json({
        message: "User not found!",
        success: false,
      });
    }
    const tsC = req.body.color;
    user.tshirtColor = tsC;
    await user.save();

    console.log("Tshirt color updated successfully!");
    return res.json({
      message: "Tshirt color updated successfully!",
      success: true,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.json({
      error,
      message: "Some error occurred, please try again!",
      success: false,
    });
  }
};

export { userRegisterControl, userLoginControl, userUpdateTshirtColorControl };

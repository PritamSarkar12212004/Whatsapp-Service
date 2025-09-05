import express from "express";
import AsyncHandel from "express-async-handler";
import MainOtpController from "../../controller/otp/MainOtpController.js";

const route = express.Router();
route.post("/otp", AsyncHandel(MainOtpController));

export default route;

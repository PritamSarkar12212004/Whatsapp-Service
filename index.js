// import ts module
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/database/DataBase.js";
import whatsappConnect from "./src/services/whatsapp/whatsappConnect.js";
import otpRoutes from "./src/routes/otp/otpRoutes.js";

// create express app
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/whatsapp", otpRoutes);

//  connect mongo db
connectDB()
  .then(() => {
    // connect whatsappc Tool bots
    whatsappConnect()
      .then(() => {
        const port = process.env.PORT || 8080;
        app.listen(port, () => {
          console.log(`server Start at Port  ${port}`);
        });
      })
      .catch((err) => {
        console.log(`Whatsapp Connection Failed Due to ` + err);
      });
  })
  .catch((err) => {
    console.log(`DataBase Connection Faild Due to ` + err);
  });

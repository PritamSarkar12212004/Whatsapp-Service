import otpModel from "../../models/otpModel.js";
import { client } from "../../services/whatsapp/whatsappConnect.js";
import WhstappBody from "../../services/whatsapp/WhstappBody.js";

const MainOtpController = async (req, res) => {
  try {
    const { number, otp, type } = req.body;
    if (!number) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }
    await otpModel.deleteMany({ Phone_Number: number });
    const otpDoc = await otpModel.create({
      otp: otp,
      Phone_Number: number,
    });

    try {
      await WhstappBody(client, number, otp, type);
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully!",
        data: {
          phoneNumber: otpDoc.Phone_Number,
          otp: otpDoc.otp,
        },
      });
    } catch (error) {
      console.error("WhatsApp error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP via WhatsApp",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Error in MainOtpController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default MainOtpController;

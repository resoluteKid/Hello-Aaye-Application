import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//OTP GENERATION

const generateOtp = () => {
    Math.floor(1000 + Math.random() * 9000).toString();
}

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

//SIGNUP

export const registerUser = async (req, res) => {

  try {
    const { fullName, mobile } = req.body;

    if (!fullName || !mobile) {
      return res
        .status(400)
        .json({ message: "Full name and mobile are required" });
    }

    const existingUser = await User.findOne({ mobile });

    if (existingUser) {
      return res.status(409).json({
        message: "Mobile number already exists",
      });
    }

    const otp = generateOtp();

    await User.create({
      fullName,
      mobile,
      mobileOtp: otp,
      mobileOtpExpiry: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // TODO: integrate SMS service here
    console.log(" Mobile OTP:", otp);

    res.status(200).json({
      message: "OTP sent to mobile number",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const verifyMobileOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await User.findOne({ mobile });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (
      user.mobileOtp !== otp ||
      user.mobileOtpExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isMobileVerified = true;
    user.mobileOtp = null;
    user.mobileOtpExpiry = null;
    await user.save();

    res.json({ message: "Mobile verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addEmail = async (req, res) => {
  try {
    const { mobile, email } = req.body;

    const user = await User.findOne({ mobile });

    if (!user || !user.isMobileVerified) {
      return res.status(400).json({ message: "Mobile not verified" });
    }

    const otp = generateOtp();

    user.email = email;
    user.emailOtp = otp;
    user.emailOtpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    // TODO: integrate Email provider here
    console.log("Email OTP:", otp);

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (
      user.emailOtp !== otp ||
      user.emailOtpExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isEmailVerified = true;
    user.emailOtp = null;
    user.emailOtpExpiry = null;

    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setPin = async (req, res) => {
  try {
    const { mobile, pin } = req.body;

    if (!/^\d{4}$/.test(pin)) {
      return res
        .status(400)
        .json({ message: "PIN must be exactly 4 digits" });
    }

    const user = await User.findOne({ mobile });

    if (!user || !user.isEmailVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    user.pin = await bcrypt.hash(pin, 10);
    await user.save();

    res.json({ message: "PIN set successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//LOGIN

export const loginUser = async (req, res) => {
  try {
    const { mobile, pin } = req.body;

    const user = await User.findOne({ mobile });

    if (!user || !user.pin) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(pin, user.pin);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid PIN" });
    }

    const token = generateToken(user._id);

    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        mobile: user.mobile,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

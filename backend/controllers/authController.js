const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });   
        //console.log("newuser",newUser);
        const token = signToken(newUser._id);

        res.status(201).json({
            success: true,
            token,
            data: {
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        const user = await User.findOne({ email }).select('+password');
        //console.log("user",user);

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password'
            });
        }

        const token = signToken(user._id);

        res.status(200).json({
            success: true,
            token,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
// // ✅ 1. Send Reset Code via Email
// exports.sendResetCode = async (req, res) => {
//     try {
//         const { email } = req.body;
//         console.log("email recevied",email)
//         // Check if user exists
//         const user = await User.findOne({ email });
//         console.log("user",user);
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User with this email does not exist'
//             });
//         }

//         // Generate a 4-digit reset code
//         const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
//         console.log("resercode",resetCode);

//         // Store hashed code in the database (valid for 10 mins)
//         user.resetPasswordCode = crypto.createHash('sha256').update(resetCode).digest('hex');
//         user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
//         await user.save();
//         console.log("successfully");

//         // Send email with reset code
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER ||"lpun490@gmail.com" ,
//                 pass: process.env.EMAIL_PASS ||"fiuf ujxe zdec syav"
//             },
//             logger: true, // Logs everything
//            debug: true 
//         });
//          console.log("usermaia",user.email);
//         const mailOptions = {
//             from: process.env.EMAIL_USER || "lpun490@gmail.com",
//             to: user.email,
//             subject: 'Password Reset Code',
//             text: `Your password reset code is: ${resetCode}`
//         };

//     //    const info= await transporter.sendMail(mailOptions);
//     //     console.log("email sent successfully");
   
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent:', info.response);
    
//         res.status(200).json({
//             success: true,
//             message: 'Verification code sent to email'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

exports.sendResetCode = async (req, res) => {
    try {
        const { email } = req.body;
        //console.log("Received email:", email);

        // Check if user exists
        const user = await User.findOne({ email });
        //console.log("User found:", user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User with this email does not exist'
            });
        }

        // Generate a 4-digit reset code
        const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
        //console.log("Generated reset code:", resetCode);

        // Store hashed code in the database (valid for 10 mins)
        user.resetPasswordCode = crypto.createHash('sha256').update(resetCode).digest('hex');
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();
        //console.log("Reset code stored successfully in DB");

        // Configure email transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            // logger: true, // Logs everything
            // debug: true 
        });

        // Verify SMTP connection before sending
        // transporter.verify((error, success) => {
        //     if (error) {
        //         console.error('SMTP Connection Error:', error);
        //     } else {
        //         console.log('SMTP Connection Successful! Ready to send emails.');
        //     }
        // });

        // Send email with reset code
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Code',
            text: `Your password reset code is: ${resetCode}`
        };

        const info = await transporter.sendMail(mailOptions);
        //console.log('Email sent successfully:', info.response);

        res.status(200).json({
            success: true,
            message: 'Verification code sent to email'
        });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send email. Please try again."
        });
    }
};

// ✅ 2. Verify Code & Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        //console.log("reset password",email,code,newPassword);

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User with this email does not exist'
            });
        }
        //console.log
        // Hash the provided code and compare with stored hash
        const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
        if (hashedCode !== user.resetPasswordCode || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification code'
            });
        }

        // Update password
        user.password = newPassword;
        user.resetPasswordCode = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Generate a new token
        const token = signToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Password reset successful',
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

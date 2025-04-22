import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY; // Secret key for JWT

// Helper function to generate verification token
const generateVerificationToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
};

// Sign-up function
export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Data validation
        if (!fullname || typeof fullname !== 'string' || fullname.trim().length < 3) {
            return res.status(400).json({ message: "Invalid fullname. Must be at least 3 characters." });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash password and create the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, email, password: hashedPassword });

        // Generate verification token
        const verificationToken = generateVerificationToken(newUser._id);
        newUser.verificationToken = verificationToken;

        // Save the user with isVerified: false
        await newUser.save();

        // Send verification email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const verificationLink = `http://localhost:3000/user/verify-email?token=${verificationToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: 'Verify your email',
            text: `Please verify your email by clicking on the following link: ${verificationLink}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "User created successfully. Please verify your email." });
    } catch (error) {
        console.error("Error", error.message);
        res.status(500).json("Error",error,{ message: "Error creating user." });
    }
};

// Email verification function
export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token.' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified.' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: 'Invalid or expired token.' });
    }
};

// Login function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password." });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist." });
        }

        if (!existingUser.isVerified) {
            return res.status(400).json({ message: "Please verify your email before logging in." });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password." });
        }

        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email, isAdmin: existingUser.isAdmin },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

       // Exclude password from the user object
       const { password: _, ...userWithoutPassword } = existingUser._doc;

       res.status(200).json({
           message: "Login successful",
           user: userWithoutPassword,
           token
       });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error during login." });
    }
};


export const allUsers = async (req,res)=>{
    try {
        const users = await User.find().select('-password');;
        res.status(200).json(users);
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Update user (e.g., to make isAdmin: true)
export const updateUsers = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, // Use $set to update fields explicitly
            { new: true, runValidators: true } // Return the updated user
        );
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Error: " + error.message }); // Send proper error response
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Error: " + error.message });
    }
};


export const resetPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      if (!email) {
        return res.status(400).json({ message: "Please provide an email." });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      
      if (user.isVerified === false) {
        return res.status(400).json({ message: "Please verify your email before resetting the password." });
      }
  
      // Generate reset token and expiration time
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour expiry time
  
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetTokenExpiresAt;
  
      await user.save();
  
      // Create a transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,  // Add your email and password
          pass: process.env.EMAIL_PASS
        }
      });
  
      // Create the reset link
      const resetLink = `http://localhost:5173/update-password?token=${resetToken}`;
  
      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset Request",
        text: `You requested a password reset. Please click the link to reset your password: ${resetLink}. This link will expire in 1 hour.`,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ success: true, message: "Reset link sent to your email." });
  
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Error processing password reset request." });
    }
  };

  export const UpdatePassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;
  
    try {
      // Validate inputs
      if (!resetToken || !newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: "Invalid token or password." });
      }
  
      // Find user by reset token and check token expiry
      const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() },  // Check if token is not expired
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
  
      // Clear reset token and expiry
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your Password Has Been Changed",
        text: `Your password has been successfully updated. If you didn't make this change, please contact support immediately.`,
      };
      
      await transporter.sendMail(mailOptions);
      
  
      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Error updating password." });
    }
  };
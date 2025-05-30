const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "Aayush@s@good";

// ROUTE:1  Create a user using: POST "/api/auth/". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter valid name of length 8").isLength({ min: 8 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter valid password of length 8").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry, user already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

success=true;
      res.json({success, authtoken }); 
      
      // Send token in JSON response
    } catch (error) {
      console.error(error.message);
      res.status(500).send("An error occurred");
    }
  }
);

// ROUTE:2   Login a user using: POST "/api/auth/login". No login required
router.post(
  "/userlogin",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be null").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success= false;
        return res
          .status(400)
          .json({success,  error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
success=true;
      res.json({ success, authtoken }); // Send token in JSON response

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE:3 GET loggedIn user details using: GET "/api/auth/getuser".  login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user); // Use res.json for consistency
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error"); // Return JSON error response
  }
});

module.exports = router;

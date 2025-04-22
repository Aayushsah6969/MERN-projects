import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Google Auth Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Auth Callback Route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send token to client
    res.redirect(`http://localhost:3000?token=${token}`); // Update with your frontend URL
  }
);

export default router;

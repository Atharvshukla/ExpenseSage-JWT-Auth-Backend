const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Register a new user
router.post('/register', authController.register);

// Login existing user
router.post('/login', authController.login);
router.get("/verify",authMiddleware , authController.verifyToken);

module.exports = router;

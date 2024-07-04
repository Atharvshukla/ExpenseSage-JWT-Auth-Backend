const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/UserModel');

// Register a new user
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = generateToken(newUser._id);

        // Respond with token
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Login existing user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Respond with token
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

// Verify JWT token
const verifyToken = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization');

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user information to request object
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        // If token is invalid
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '3h' });
};

module.exports = { register, login, verifyToken };

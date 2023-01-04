const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userController = require('../controllers/UserController');

// Sign up a new user
exports.signup = async (req, res) => {
    try {
        const {name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json('Name, email, and password are required');
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json("User Already Exist. Please Login");
        }

        // Hash the password
        const hash = await bcrypt.hash(password, 10);
        // Create the user
        const newUser = new User({
            name: name,
            email: email,
            password: hash
        });
        
        // Create a JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });
        newUser.token = token;

        // Save the user to the database
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Sign in an existing user
exports.signin = async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json('Email or password incorrect');
        }
        // Check the password
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json('Email or password incorrect');
        }
        // Create a JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        // save user token
        user.token = token;

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

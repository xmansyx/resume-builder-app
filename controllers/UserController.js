const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await newUser.save();
        res.json('User created successfully');
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get a single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json('User not found');
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {
            new: true
        });
        if (!user) {
            res.status(404).json('User not found');
        } else {
            res.json({
                "message": 'User updated successfully',
                "data": user
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            res.status(404).json('User not found');
        } else {
            res.json('User deleted successfully');
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

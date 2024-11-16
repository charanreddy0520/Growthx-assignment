const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

// Register User
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered" });
};

// Login User
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
};

// Upload Assignment
exports.uploadAssignment = async (req, res) => {
    const { task, admin } = req.body;
    const assignment = new Assignment({ userId: req.user.id, task, admin });
    await assignment.save();
    res.status(201).json({ message: "Assignment uploaded" });
};

// Fetch all Admins
exports.getAdmins = async (req, res) => {
    const admins = await Admin.find();
    res.json(admins);
};

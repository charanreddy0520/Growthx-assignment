const Admin = require('../models/adminModel');
const Assignment = require('../models/assignmentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Admin
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: "Admin registered" });
};

// Login Admin
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
    res.json({ token });
};

// Get Assignments
exports.getAssignments = async (req, res) => {
    const assignments = await Assignment.find({ admin: req.user.id }).populate('userId', 'username');
    res.json(assignments);
};

// Accept Assignment
exports.acceptAssignment = async (req, res) => {
    await Assignment.findByIdAndUpdate(req.params.id, { status: 'Accepted' });
    res.json({ message: "Assignment accepted" });
};

// Reject Assignment
exports.rejectAssignment = async (req, res) => {
    await Assignment.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.json({ message: "Assignment rejected" });
};

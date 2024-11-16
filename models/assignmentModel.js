const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    status: { type: String, default: 'Pending' },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
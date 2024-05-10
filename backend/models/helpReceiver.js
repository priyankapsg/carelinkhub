const mongoose = require('mongoose');

const allowedStatus = ['Requested', 'Accepted', 'Started', 'Verified', 'Ended', 'Stopped'];

const userSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    comments: {
        type: String
    },
    status: {
        type: String,
        enum: allowedStatus,
        default: 'Requested'
    },
    volunteer_id: {
        type: String
    },
    duration: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

const helpModal = mongoose.model('Help', userSchema);
module.exports = helpModal;
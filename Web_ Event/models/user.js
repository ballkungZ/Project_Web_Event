const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const EventSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

module.exports = mongoose.model('User',EventSchema);
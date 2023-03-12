const Event = require('../../models/event');
const User = require('../../models/user');
const {dateToString} = require('../../helpers/date')

const events = async eventIds => {
    try {
    const events = await Event.find({ _id: { $in: eventIds }})
    return events.map(event => {
        return formEvent(event);
        });          
    } catch (err) {
            throw err;
    }        
};

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return formEvent(event);
    } catch(err) {
        throw err;
    }
};

const user = async userId => {
try {
    const user = await User.findById(userId);
    return {...user._doc,_id: user.id, 
        createdEvents: events.bind(this, user._doc.createdEvents)   
    };
    } catch(err) {
        throw err;
    }
};

const formEvent = event => {
    return {...event._doc,
        _id: event.id,
       date: dateToString(event._doc.date),
       creator: user.bind(this, event.creator)
    }
};

const formBooking = booking => {
    return {...booking._doc, _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)   
    }
};

exports.formBooking = formBooking;
exports.formEvent = formEvent;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
const Event = require('../../models/event');
const Booking = require('../../models/booking');
const {formBooking, formEvent} = require('./merge');



module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticateced');
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return formBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticateced');
        }
        const fetchedEvent = await Event.findOne({_id: args.eventId});
        const booking = new Booking ({
            user: req.userId,
            event: fetchedEvent
        });
        const result = await booking.save();
        return formBooking(result);
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticateced');
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = formEvent(booking.event);
            console.log(event);
            await Booking.deleteOne({_id: args.bookingId});
            return event;
        } catch (err){
            throw err;
        }
    }
};
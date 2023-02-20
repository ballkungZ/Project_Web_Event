const { dateToString } = require('../../helpers/date');
const Event = require('../../models/event');
const Booking = require('../../models/booking');
const {formBooking, formEvent} = require('./merge');



module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return formBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({_id: args.eventId});
        const booking = new Booking ({
            user: '63ee528e290228a808e62a90',
            event: fetchedEvent
        });
        const result = await booking.save();
        return formBooking(result);
    },
    cancelBooking: async args => {
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
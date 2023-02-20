const Event = require('../../models/event');
const { formEvent } = require('./merge');
const User = require('../../models/user')



module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
                return events.map(event => {
                    return formEvent(event);
                });
            } catch(err) {
                throw err;
            };
    },
    CreateEvent: async (args,req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticateced');
        }
            const event = new Event({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: new Date(args.eventInput.date),
                    creator: req.userId
            });
            let createdEvent;
            try {
            const result = await event.save()
                    createdEvent = formEvent(result);
                    const creator = await User.findById(req.userId);
                   
                    if (!creator) {
                            throw new Error('User not found!!');
                    }
                    creator.createdEvents.push(event);
                    await creator.save();
            
                    return createdEvent;
            } catch(err) {
                throw err;       
            };
            
    },
};
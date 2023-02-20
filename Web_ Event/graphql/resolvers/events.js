const Event = require('../../models/event');
const { formEvent } = require('./merge');



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
    CreateEvent: async args => {
            const event = new Event({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: new Date(args.eventInput.date),
                    creator: '63ee528e290228a808e62a90'
            });
            let createdEvent;
            try {
            const result = await event.save()
                    createdEvent = formEvent(result);
                    const creator = await User.findById('63ee528e290228a808e62a90');
                   
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
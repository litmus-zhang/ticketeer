
const Event = require('../../models/event');
const User = require('../../models/user');

//Helper
const { user, transformBooking, transformEvent, events, singleEvent} = require('./merge');


    module.exports = {
        events: async () =>
        {
            try
            {
                const events = await Event.find();
                return events.map(event =>
                {
                    return transformEvent(event);
                })
            } catch (error)
            {
                console.log(error);
                throw error;
            }
    
        },

        createEvent: async (args) =>
        {
            const { title, description, price, date } = args.eventInput;
            try
            {
                const event = new Event({
                    title,
                    description,
                    price: +price,
                    date: new Date(date),
                    creator: "62af22fdd17aa0454c1208b2"
                })
                let createdEvent
                let result = await event.save();
                createdEvent = transformEvent(result);
                const creator = await User.findById("62af22fdd17aa0454c1208b2")
                if (!creator)
                {
                    throw new Error('User not found');
                }
                creator.createdEvents.push(event);
                creator.save();
                return createdEvent;
            } catch (error)
            {
                console.log(error);
                throw error;
            }
        
        },


       
    }



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

        createEvent: async (args, req) =>
        {
            if (!req.isAuth)
            {
                throw new Error('Unauthenticated!');
            }
            const { title, description, price, date } = args.eventInput;
            try
            {
                const event = new Event({
                    title,
                    description,
                    price: +price,
                    date: new Date(date),
                    creator: req.userId
                }) 
                let createdEvent
                let result = await event.save();
                createdEvent = transformEvent(result);
                const creator = await User.findById(req.userId);
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



const Event = require('../../models/event');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

//Helper
const events =  async (eventIds) =>
{
    try
    {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event =>
        {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            };
        });
    } catch (err)
    {
        throw err;
    }
}
const user = async userId =>
{
    try
    {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    } catch (err)
    {
        console.log(err);
        throw new Error(err);
    }
}


module.exports = {
    events: async () =>
    {
        try {
            const events = await Event.find();
            return events.map(event =>
            {
                return {
                    ...event._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event.creator)
                }
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
       
        // return Event.find().then(
        //     events =>
        //     {
        //         return events.map(event =>
        //         {
        //             return {...event._doc}
        //         })
        //     }
        // ).catch(err =>
        // {
        //     throw err;
        // });
    },
    createEvent: async (args) =>
    {
        const { title, description, price, date } = args.eventInput;
        try {
            const event = new Event({
                title,
                description,
                price: +price,
                date: new Date(date),
                creator: "62af22fdd17aa0454c1208b2"
            })
            let createdEvent
            let result = await event.save();
            createdEvent = {
                ...result._doc,
                date: new Date(result._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
            const creator = await User.findById("62af22fdd17aa0454c1208b2")
            if (!creator)
            {
                throw new Error('User not found');
            }
            creator.createdEvents.push(event);
            creator.save();
            return createdEvent;
        } catch (error) {
            console.log(error);
            throw error;
        }
        // const event = new Event({
        //     title,
        //     description,
        //     price,
        //     date
        // });
        // return event.save().then(
        //     result =>
        //     {
        //         console.log(result);
        //         return {...result._doc};
        //     }
        // ).catch(error =>
        // { 
        //     console.log(error);
        //     throw error;
        // })
    },
    createUser: async (args) =>
    {
        const { email, password } = args.userInput;
        try
        {
            const existingUser = await User.findOne({ email });
            if (existingUser)
            {
                throw new Error('User already exists');
            } else
            {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashedPassword
            });
            let result = await user.save();
            return {...result._doc, password: null};
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}
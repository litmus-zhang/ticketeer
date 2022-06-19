
const Event = require('../../models/event');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const Booking = require('../../models/booking');

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

const singleEvent = async eventId =>
{
    try {
        const event = await Event.findById(eventId);
        return {
            ...event._doc,
            creator: user.bind(this, event.creator)
        }
    } catch (error) {
        throw error;
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
    
    },
    bookings: async () =>
    {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking =>
            {
                return {
                    ...booking._doc,
                    user: user.bind(this, booking._doc.user),
                    event: singleEvent.bind(this, booking._doc.event),
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString(),
                }
            })
        } catch (error) {
            throw error
        }
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
        
    },
    bookEvent: async (args) =>
    {
        const fetchedEvent = await Event.findOne({ _id :  args.eventId});
        const booking = new Booking({
            user: "62af22fdd17aa0454c1208b2",
            event: fetchedEvent,
        })
        const result = await booking.save();
        return {
            ...result._doc,
            user: user.bind(this, booking._doc.user),
            event: singleEvent.bind(this, booking._doc.event),
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString(),
        }
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
    },
    cancelBooking: async (args) =>
    {
        try
        {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = { ...booking.event._doc, creator: user.bind(this, booking.event.creator) };
            console.log(event);

            await Booking.deleteOne({ _id: args.bookingId });
            
            return event;
        } catch (error) {
            throw error;
        }
    }

}
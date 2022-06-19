
const Event = require('../../models/event');
const Booking = require('../../models/booking');


//Helper
const { user, transformBooking, transformEvent, events, singleEvent } = require('./merge');


module.exports = {
        bookings: async () =>
        {
            try
            {
                const bookings = await Booking.find();
                return bookings.map(booking =>
                {
                    return transformBooking(booking);
                })
            } catch (error)
            {
                throw error
            }
        },
        bookEvent: async (args) =>
        {
            const fetchedEvent = await Event.findOne({ _id: args.eventId });
            const booking = new Booking({
                user: "62af22fdd17aa0454c1208b2",
                event: fetchedEvent,
            })
            const result = await booking.save();
            return transformBooking(result);
        },
        cancelBooking: async (args) =>
        {
            try
            {
                const booking = await Booking.findById(args.bookingId).populate('event');
                const event = transformEvent(booking.event);
                console.log(event);

                await Booking.deleteOne({ _id: args.bookingId });
            
                return event;
            } catch (error)
            {
                throw error;
            }
        }
    }


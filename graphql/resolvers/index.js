const authResolver = require('./auth');
const eventResolver = require('./events');
const bookingResolver = require('./bookings');



const RootResolver = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver
}

module.exports = RootResolver;

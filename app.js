const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Models
const Event = require('./models/event');
const User = require('./models/user');

//Helpers
const events =  async (eventIds) =>
{
    try
    {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event =>
        {
            return {
                ...event._doc,
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

const app = express();
app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!

        }
        type User{
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]
        }

        input UserInput{
            email: String!
            password: String!
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        type RootQuery {
            events: [Event!]! 

        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User

        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: async () =>
        {
            try {
                const events = await Event.find();
                return events.map(event =>
                {
                    return {
                        ...event._doc,
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
                    creator: "62af0fdf13c1699b831071c2"
                })
                let createdEvent
                let result = await event.save();
                createdEvent = { ...result._doc, creator: user.bind(this, result._doc.creator) };
                const creator = await User.findById("62af0fdf13c1699b831071c2")
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
                const newUser = await User.findOne({ email });
                if (newUser)
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

    },
    graphiql: true
}));


 
const startServer = () =>
{
    try
    {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.d4qbofb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)

        app.listen(process.env.PORT || 4000, () =>
        {
            console.log('Server started on port 4000');
        })
       
    
   } catch (error) {
       console.log(error);
   }

}


startServer()

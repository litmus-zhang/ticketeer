const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Helper
const { user, transformBooking, transformEvent, events, singleEvent} = require('./merge');



    module.exports = {
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
                    return { ...result._doc, password: null };
                }
            } catch (error)
            {
                console.log(error);
                throw error;
            }
        },
        login: async ({ email, password }) =>
        {
            const user = await User.findOne({ email });
            if (!user)
            {
                throw new Error('User does not exist');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual)
            {
                throw new Error('Password is incorrect');
            }
            const token = jwt.sign({
                userId: user.id,
                email: user.email
            },
                'somesupersecretkey',
                { expiresIn: '1h' });
            
            return { userId: user.id, token: token, tokenExpiration: 1 };
        }
    }


const User = require('../../models/user');
const bcrypt = require('bcryptjs');

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
    }


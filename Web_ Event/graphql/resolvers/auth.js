const bcrypt = require('bcryptjs');

const User = require('../../models/user');




module.exports = {
    CreateUser: async args => {
        try {
            const existingUser = await User.findOne({Email:args.userInput.Email});
            if (existingUser) {
                throw new Error('User exists already');
            };
            const hashedPassword = await bcrypt.hash(args.userInput.Password,12)
                    
            const user = new User({
                Email: args.userInput.Email,
                Password: hashedPassword 
            });
            const result = await user.save();
 
            return {...result._doc,Password: null, _id: result.id};
            } catch(err) {
                throw err;
        };
    },
};
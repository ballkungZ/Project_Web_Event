const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');




module.exports = {
    CreateUser: async args => {
        try {
            const existingUser = await User.findOne({ Email:args.userInput.Email });
            if (existingUser) {
                throw new Error('User exists already');
            };
            const hashedPassword = await bcrypt.hash(args.userInput.Password,12);
                    
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
    login: async ({email, password}) => {
        const user = await User.findOne({ Email: email });
        if (!user) {
            throw new Error('User does not exist!!');
        }
        const isEqual = await bcrypt.compare(password, user.Password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            {userId : user.id, email: user.Email}, 
            'somesupersecretkey', 
            {expiresIn: '1h'
        });
        return { userId: user.id, token: token, tokenExpiration: 1 };
    }
};
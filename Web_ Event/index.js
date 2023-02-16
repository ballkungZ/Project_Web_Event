const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema} = require('graphql');
const bcrypt = require('bcryptjs');
require('dotenv/config');

const Event = require('./models/event');
const User = require('./models/user');


app.use(bodyParser.json());

const events = eventIds => {
        return Event.find({_id: {$in: eventIds}})
        .then(events => {
                return events.map(event => {
                        return { ...event._doc,
                                 _id: event.id,
                                 creator: user.bind(this, event.creator)
                                };
                });                
        })
        .catch(err => {
                throw err;
        });        
}

const user = userID => {
        return User.findById(userID)
        .then(user =>{
             return {...user._doc,_id: user.id, createdEvents: events.bind(this, user._doc.createdEvents) };   
        })
        .catch(err => {
                throw err;
        });
}

app.use('/graphql',graphqlHTTP({
        schema: buildSchema(`
                type Event {
                        _id: ID!
                        title: String!
                        description: String!
                        price: Float!
                        date: String!
                        creator: User!
                }

                type User {
                        _id: ID!
                        Email: String!
                        Password: String
                        createdEvents: [Event!]  
                }

                input EventInput {
                        title: String!
                        description: String!
                        price: Float!
                        date: String!
                }

                input UserInput {
                        Email: String!
                        Password: String! 
                }

                type RootQuery {
                        events:[Event!]!
                }

                type RootMutation {
                        CreateEvent(eventInput: EventInput): Event
                        CreateUser(userInput: UserInput): User
                }

                schema {
                        query: RootQuery
                        mutation: RootMutation
                }
        `),
        rootValue: {
                events: () => {
                        return Event.find()
                        .populate("creator")
                        .then(events => {
                                return events.map(event => {
                                        return {...event._doc,_id: event.id,
                                                creator: user.bind(this, event._doc.creator) 
                                        };
                                });
                        }).catch(err => {
                                throw err;
                        });
                },
                CreateEvent: args => {
                        const event = new Event({
                                title: args.eventInput.title,
                                description: args.eventInput.description,
                                price: +args.eventInput.price,
                                date: new Date(args.eventInput.date),
                                creator: '63ee1a12b1eb7c7751e8adc3'
                        });
                        let createdEvent;
                        return event.save().then(result => {
                                createdEvent = {...result._doc, _id: result._doc._id.toString(), 
                                        creator: user.bind(this,result._doc.creator)};
                                return User.findById('63ee1a12b1eb7c7751e8adc3');
                               
                        }).then(user => {
                                if (!user) {
                                        throw new Error('User not found!!');
                                }
                                user.createdEvents.push(event);
                                return user.save();
                        }).then(result => {
                                return createdEvent;
                        }).catch(err =>{
                                console.log(err);
                                throw err;       
                        });
                        
                },
                CreateUser: args => {
                        return User.findOne({Email:args.userInput.Email})
                        .then(user => {
                                if (user) {
                                        throw new Error('User exists already');
                                }
                                return bcrypt.hash(args.userInput.Password,12)
                        })
                        .then(hashedPassword => {
                                const user = new User({
                                        Email: args.userInput.Email,
                                        Password: hashedPassword 
                                 });
                                 return user.save();
                        }).then(result => {
                                return {...result._doc,Password: null, _id: result.id};
                        }).catch(err =>{
                                throw err;
                        });
                }
        },
        graphiql: true
}));

const PORT = 3000;
mongoose.set('strictQuery', false);
//Connect to DB
mongoose.connect(process.env.DB_Connect)
        .then(() => console.log('Database Connection ^(*-*)^'))
        .catch((err) => console.error(err))
        app.use(cors())
        require('./routes.js')(app);

app.listen(PORT, () => console.log('Server Running!!!'))


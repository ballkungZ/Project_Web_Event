const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema} = require('graphql');
require('dotenv/config');

const Event = require('./models/event');
const { events } = require('./models/event');

app.use(bodyParser.json());

app.use('/graphql',graphqlHTTP({
        schema: buildSchema(`
                type Event {
                        _id: ID!
                        title: String!
                        description: String!
                        price: Float!
                        date: String!
                }

                input EventInput {
                        title: String!
                        description: String!
                        price: Float!
                        date: String!
                }
                type RootQuery {
                        events:[Event!]!
                }

                type RootMutation {
                        CreateEvent(eventInput: EventInput): Event
                }

                schema {
                        query: RootQuery
                        mutation: RootMutation
                }
        `),
        rootValue: {
                events: () => {
                        return Event.find().then(events => {
                                return events.map(event => {
                                        return {...event._doc};
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
                                date: new Date(args.eventInput.date)
                        });
                        return event.save().then(result => {
                                console.log(result);
                                return {...result._doc};
                        }).catch(err =>{
                                console.log(err);
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


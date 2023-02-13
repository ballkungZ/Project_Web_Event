const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema} = require('graphql');
require('dotenv/config');
const events = [];

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
                        return events;
                },
                CreateEvent: args => {
                        const event = {
                                _id: Math.random().toString(),
                                title: args.eventInput.title,
                                description: args.eventInput.description,
                                price: +args.eventInput.price,
                                date: args.eventInput.date
                        };
                        events.push(event);
                        return event;
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


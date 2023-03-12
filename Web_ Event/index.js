const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const graphiqlSchema = require('./graphql/scherma/app');
const graphiqlResolvers = require('./graphql/resolvers/app');
const isAuth = require('./middleware/is-auth');

const app = express();

require('dotenv/config');

app.use(bodyParser.json());

app.use((req,res,next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
        }
        next();
});

app.use(isAuth);

app.use('/api',graphqlHTTP({
        schema: graphiqlSchema,
        rootValue: graphiqlResolvers,
        graphiql: true
}));

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://ballzaz1:Ballza123z@cluster0.ipoxb6b.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });


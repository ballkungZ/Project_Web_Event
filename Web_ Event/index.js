const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const graphiqlSchema = require('./graphql/scherma/app');
const graphiqlResolvers = require('./graphql/resolvers/app');
const isAuth = require('./middleware/is-auth');

require('dotenv/config');



app.use(bodyParser.json());

app.use(isAuth);

app.use('/api',graphqlHTTP({
        schema: graphiqlSchema,
        rootValue: graphiqlResolvers,
        graphiql: true
}));

const PORT = 3000;
mongoose.set('strictQuery', false);
//Connect to DB
mongoose.connect(process.env.DB_Connect)
        .then(() => console.log('Database Connection ^(*-*)^'))
        .catch((err) => console.error(err))
        app.use(cors())
        require('./routes')(app);

app.listen(PORT, () => console.log('Server Running!!!'))


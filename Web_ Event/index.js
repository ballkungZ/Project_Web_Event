const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const graphiqlSchema = require('./graphql/scherma/app');
const graphiqlResolvers = require('./graphql/resolvers/app');
const isAuth = require('./middleware/is-auth');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');


require('dotenv/config');

app.set('view engine','ejs');
app.use(expressLayouts);

app.use(bodyParser.json());

app.use(isAuth);
// static flie
app.use(express.static('view'));
app.use('/css',express.static(__dirname + 'view/css'));
app.use('/js',express.static(__dirname + 'view/js'));
app.use('/img',express.static(__dirname + 'view/img'));


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


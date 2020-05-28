const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Connect to mlab
mongoose.connect('mongodb://patrick:test123@ds261817.mlab.com:61817/gql-starter');
mongoose.connection.once('open', () => console.log('Connected to database'));

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4002, () => {
  console.log('server started');
});

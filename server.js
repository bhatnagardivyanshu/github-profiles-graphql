const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));
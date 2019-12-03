const cors = require('cors');
const express = require('express');
const schema = require('./schema');
const graphqlHttp = require('express-graphql');

const app = express();

app.use(cors());

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));
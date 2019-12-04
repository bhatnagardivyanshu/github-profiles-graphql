const cors = require('cors');
const path = require('path');
const express = require('express');
const schema = require('./schema');
const graphqlHttp = require('express-graphql');

const app = express();

app.use(cors());

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}));

app.use(express.static('public'));

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));
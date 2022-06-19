const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');

const app = express();
app.use(bodyParser.json());
//Models

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');


//Helpers


app.use( isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));


 
const startServer = () =>
{
    try
    {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.d4qbofb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)

        app.listen(process.env.PORT || 4000, () =>
        {
            console.log('Server started on port 4000');
        })
       
    
   } catch (error) {
       console.log(error);
   }

}


startServer()

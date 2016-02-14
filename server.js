/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import {graphql} from 'graphql';
import graphqlHTTP from 'express-graphql';
import Schema from './schema/schema';
import { privateSettings } from './settings/settings';

const APP_PORT = process.env.PORT || 3000;
const GRAPHQL_PORT = 8080;
const graphQLServer = express();

let app = express();

graphQLServer.use('/', graphqlHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

app.use(require('prerender-node').set('prerenderToken', privateSettings.prerenderToken ));
app.use(express.static('./dist'));
app.use('/graphql', graphqlHTTP(request => ({
    graphiql: true,
    pretty: true,
    schema: Schema,
  })
));
app.get('*', function response(req, res, next) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import { apolloServer } from 'apollo-server';
import { Definitions, Resolvers } from './schema/schema';
import { privateSettings } from './settings/settings';
import bodyParser from 'body-parser';

const APP_PORT = process.env.PORT || 3000;
const GRAPHQL_PORT = 8080;
const graphQLServer = express();
const app = express();

graphQLServer.use('/', bodyParser.json(), apolloServer({
  graphiql: true,
  pretty: true,
  schema: Definitions,
  resolvers: Resolvers
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

app.use(require('prerender-node').set('prerenderToken', privateSettings.prerenderToken ));
app.use(express.static('./dist'));
app.use('/graphql', apolloServer({
  graphiql: true,
  pretty: true,
  schema: Definitions,
  resolvers: Resolvers
}));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

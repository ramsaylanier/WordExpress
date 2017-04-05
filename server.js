/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import { privateSettings } from './settings/settings';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';
import { executableSchema } from './schema/schema';

const APP_PORT = process.env.PORT || 3000;
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema
}));

app.use(require('prerender-node').set('prerenderToken', privateSettings.prerenderToken ));
app.use(express.static('./dist'));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

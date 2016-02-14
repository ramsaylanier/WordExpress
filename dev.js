/* eslint no-console: 0 */
import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import {graphql} from 'graphql';
import graphqlHTTP from 'express-graphql';
import Schema from './schema/schema';
import { privateSettings } from './settings/settings';

const APP_PORT = 3000;
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

const compiler = webpack(config);

app = new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: true,
  contentBase: 'src',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
 });

app.use(webpackHotMiddleware(compiler));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

/* eslint no-console: 0 */
import path from 'path';
import browserSync from 'browser-sync';
import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import {graphql} from 'graphql';
import graphqlHTTP from 'express-graphql';
import Schema from './data/schema/schema.js';

const isDeveloping = process.env.NODE_ENV !== 'production';
const APP_PORT = isDeveloping ? 3100 : process.env.PORT;
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

if (isDeveloping) {

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

} else {
  app.use(express.static(__dirname));
  app.use('/graphql', graphqlHTTP(request => ({
      graphiql: true,
      pretty: true,
      schema: Schema,
    })
  ));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
}

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

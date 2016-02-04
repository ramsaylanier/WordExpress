// import { WordExpressDatabase, WordExpressGraphQLSchema } from 'wordexpress-schema';
import WordExpressDatabase from './db';
import WordExpressGraphQLSchema from './graphQLSchema';
import { publicSettings, privateSettings } from '../settings/settings';

const { name, username, password, host } = privateSettings.database;
const { amazonS3, uploads } = publicSettings;

const connectionDetails = {
  name: name,
  username: username,
  password: password,
  host: host,
  amazonS3: amazonS3,
  uploadDirectory: uploads
}

const Database = new WordExpressDatabase(connectionDetails);
const ConnQueries = Database.queries;
const Schema = WordExpressGraphQLSchema(ConnQueries, publicSettings);

export default Schema;

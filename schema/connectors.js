import { publicSettings, privateSettings } from '../settings/settings';
import WordExpressDatabase from './db';

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
const Connectors = Database.queries;

export default Connectors;

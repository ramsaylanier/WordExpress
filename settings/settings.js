import devSettings from './dev.json';
import prodSettings from './prod.json';

const env = process.env.NODE_ENV;
const settings = env === 'dev' ? devSettings : prodSettings;

const publicSettings = settings.public;
const privateSettings = settings.private;

export { publicSettings, privateSettings };

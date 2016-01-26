const env = process.env.NODE_ENV;
const settings = env === 'dev' ? require('./dev.json') : require('./prod.json');

const publicSettings = settings.public;
const privateSettings = settings.private;

export { publicSettings, privateSettings };

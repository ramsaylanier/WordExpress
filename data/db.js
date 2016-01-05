import Sequelize from 'sequelize';
import devSettings from '../settings/dev.json';
import prodSettings from '../settings/prod.json';

const env = process.env.NODE_ENV;
const settings = env === 'dev' ? devSettings : prodSettings;

const Conn = new Sequelize(
  settings.database.name,
  settings.database.username,
  settings.database.password,
  {
    dialect: 'mysql',
    host: settings.database.host,
    define: {
      timestamps: false
    }
  }
);

const Post = Conn.define('wp_posts', {
  post_author: {
    type: Sequelize.INTEGER,
  },
  post_title: {
    type: Sequelize.STRING,
  },
  post_content: {
    type: Sequelize.STRING,
  },
  post_status:{
    type: Sequelize.STRING,
  },
  post_type:{
    type: Sequelize.STRING,
  }
})

Conn.sync();

const ConnQueries = {
  getPageByTitle(title){
    return Conn.models.wp_posts.findOne({
      where: {
        post_type: 'page',
        post_status: 'publish',
        post_title: title
      }
    })
  }
}

export { Conn, ConnQueries };

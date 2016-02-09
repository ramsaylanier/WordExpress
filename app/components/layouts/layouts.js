import PostList from '../posts/PostList.js';
import DefaultLayout from './DefaultLayout.js';
import FrontPageLayout from './FrontPageLayout.js';

const Layouts = {
  'Default': {
    Component: DefaultLayout
  },
  'FrontPage': {
    Component: FrontPageLayout
  },
  'articles': {
    Component: PostList,
    postType: 'post',
    limit: 10
  }
};


export default Layouts;

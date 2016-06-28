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
  'PostList': {
    Component: PostList,
    postType: 'post',
    limit: 1
  }
};


export default Layouts;

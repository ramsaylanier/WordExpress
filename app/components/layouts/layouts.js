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
    showPosts: true,
    postType: 'post',
    limit: 1
  }
};


export default Layouts;

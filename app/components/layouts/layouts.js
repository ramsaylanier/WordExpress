import PostList from '../posts/PostList.js';
import DefaultLayout from './DefaultLayout.js';
import FrontPageLayout from './FrontPageLayout.js';
import NotFoundLayout from './NotFoundLayout.js';

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
    limit: 10,
    skip: 0
  },
  'NotFound': {
    Component: NotFoundLayout
  }
};


export default Layouts;

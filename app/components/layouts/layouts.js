import PostList from '../posts/PostList.js';
import DefaultLayout from './DefaultLayout.js';

const Layouts = {
  'Default': {
    Component: DefaultLayout,
    showPosts: false,
    postType: 'post',
    limit: 10
  },
  'PostList': {
    Component: PostList,
    showPosts: true,
    postType: 'post',
    limit: 10
  }
};


export default Layouts;

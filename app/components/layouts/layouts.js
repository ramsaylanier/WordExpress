import PostList from '../posts/PostList';
import DocumentationList from '../documentation/DocumentationList';
import PostExcerpt from '../posts/PostExcerpt';
import DefaultLayout from './DefaultLayout';
import FrontPageLayout from './FrontPageLayout';
import NotFoundLayout from './NotFoundLayout';

const Layouts = {
  'Default': {
    Component: DefaultLayout
  },
  'FrontPage': {
    Component: FrontPageLayout
  },
  'PostList': {
    Component: PostList,
    Excerpt: PostExcerpt,
    postType: 'post',
    limit: 10,
    skip: 0
  },
  'DocumentationList': {
    Component: DocumentationList,
    Excerpt: PostExcerpt,
    postType: 'documentation',
    limit: 100,
    skip: 0
  },
  'NotFound': {
    Component: NotFoundLayout
  }
};


export default Layouts;

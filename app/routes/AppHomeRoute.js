import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    pages: () => Relay.QL`
      query {
        pages(post_title:"Homepage")
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}

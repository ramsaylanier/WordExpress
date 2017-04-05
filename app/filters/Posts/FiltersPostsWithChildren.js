import {filter, map, remove} from 'lodash';

// takes unsorted posts and reduces them to top levels posts with a nested array of children
export default function FilterPostsWithChildren(posts) {
  function getChildren(post) {
    const { id } = post;
    const children = filter(posts, childPost => {
      return childPost.post_parent === id;
    });

    if (children.length > 0) {
      map(children, child => {
        const childWithChildren = getChildren(child);
        if (!post.children) {
          post.children = [];
        }

        post.children.push(childWithChildren);
      });
    }

    return post;
  }

  const topLevelPosts = remove( posts, post => {
    return post.post_parent === 0;
  });

  map(topLevelPosts, topLevelPost => {
    topLevelPost.children = [];
    return getChildren(topLevelPost);
  });

  return topLevelPosts;
}

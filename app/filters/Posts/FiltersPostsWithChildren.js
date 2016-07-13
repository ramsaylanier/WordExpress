import _ from 'lodash';


//takes unsorted posts and reduces them to top levels posts with a nested array of children
export default function FilterPostsWithChildren(posts){

  function getChildren(post){

    const { id } = post;
    const children = _.filter(posts, post => {
      return post.post_parent == id
    })

    if (children.length > 0){
      _.map(children, child => {
        child = getChildren(child);
        if (!post.children){
           post.children = [];
        }

        post.children.push(child);
      })
    }

    return post;
  }

  const topLevelPosts = _.remove( posts, post => {
    return post.post_parent === 0;
  })

  _.map(topLevelPosts, topLevelPost => {
    topLevelPost.children = [];
    let post = getChildren(topLevelPost);
    return post
  })

  return topLevelPosts;
}

import Connectors from './connectors';
import { publicSettings, privateSettings } from '../settings/settings';

const resolveFunctions = {
  Query: {
    settings(){
      return publicSettings
    },
    posts(_, args){
      return Connectors.getPosts(args).then( res=> {
        return res;
      });
    },
    menus(_, {name}){
      return Connectors.getMenu(name);
    },
    page(_, {name}){
      return Connectors.getPostByName(name);
    },
    postmeta(_, {postId}){
      return Connectors.getPostmeta(postId);
    }
  },
  Post: {
    layout(post){
      return Connectors.getPostLayout(post.id)
    },
    post_meta(post, keys){
      return Connectors.getPostmeta(post.id, keys)
    },
    thumbnail(post){
      return Connectors.getPostThumbnail(post.id)
    }
  },
  Postmeta: {
    connecting_post(postmeta){
      return Connectors.getPostById(postmeta.meta_value)
    }
  },
  Menu: {
    items(menu){
      console.log(menu.items);
      return menu.items;
    }
  },
  MenuItem: {
    navitem(menuItem){
      return Connectors.getPostById(menuItem.linkedId)
    },
    children(menuItem){
        return menuItem.children
    }
  }
}

export default resolveFunctions;

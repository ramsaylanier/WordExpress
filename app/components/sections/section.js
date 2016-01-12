import React from 'react';
import Relay from 'react-relay';

import CSSModules from 'react-css-modules';
import styles from './section.scss';

import settings from '../../../settings/dev.json';

@CSSModules(styles, {allowMultiple: true})
class Section extends React.Component{

  _renderPostTitle(){
    const title = this.props.section.post_title.match(/.{1,2}/g);
    console.log(title);
    return title.map( fragment => {
      return <span>{fragment}<br></br></span>
    })
  }

  render(){
    const { section, viewer } = this.props;
    const { post_title, post_meta } = section;
    const meta = post_meta.edges;
    const thumbnail = meta.length > 0 ? meta[0].node.connecting_post : null;
    const src = thumbnail ? settings.uploads + thumbnail.post_meta.edges[0].node.meta_value : null;
    const bg = {
      backgroundImage: "url('" + src + "')",
    };

    const bgClass = src ? 'with_background' : '';

    return(
      <div styleName={post_title + ' ' + bgClass} style={bg}>
        <h2 styleName="title">{this._renderPostTitle()}</h2>
        {this.props.children}
      </div>
    )
  }
}

export default Relay.createContainer(Section, {
  fragments: {
    section: () => Relay.QL`
      fragment on Post {
        id
        post_title
        post_meta(keys: thumbnailID first: 1){
          edges{
            node{
              id
              connecting_post{
                id
                post_meta(keys: attachedFile first:1){
                  edges{
                    node{
                      id
                      meta_value
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
});

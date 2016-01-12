import React from 'react';
import Relay from 'react-relay';

import CSSModules from 'react-css-modules';
import styles from './section.scss';

import settings from '../../../settings/dev.json';

@CSSModules(styles, {allowMultiple: true})
class Section extends React.Component{


  _handleMoustEnter(e){
    const { _title, _section } = this;

    TweenMax.to(_title, 2, {
      y: -20,
      ease: Power4.easeOut
    })
  }

  _handleMouseLeave(e){
    let title = this._title;

    TweenMax.to(title, 1, {
      y: 0,
      ease: Power4.easeOut
    })
  }

  _handleMouseMove(e){
    const section = e.nativeEvent.target;
    const sectionWidth = section.offsetWidth;
    let offsetX = (e.nativeEvent.offsetX / (sectionWidth / 2 / 5)) + 45;
    TweenMax.to(section, 2, {
      backgroundPositionX: offsetX,
      ease: Power4.easeOut
    })

  }

  _renderPostTitle(){
    const title = this.props.section.post_title.match(/.{1,2}/g);
    return title.map( (fragment, index) => {
      return <span key={index}>{fragment}<br></br></span>
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
      <div ref={ (c) => this._section = c }
        styleName={post_title + ' ' + bgClass}
        style={bg}
        onMouseEnter={this._handleMoustEnter.bind(this)}
        onMouseLeave={this._handleMouseLeave.bind(this)}
        onMouseMove={this._handleMouseMove.bind(this)}>

        <h2 ref={ (t)=> this._title = t } styleName="title">{this._renderPostTitle()}</h2>
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

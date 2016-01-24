import React from 'react';
import _ from 'lodash';
import htmlparser from 'htmlparser2';

import { browserHistory } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './post.scss';

@CSSModules(styles, {allowMultiple: true})
class PostContent extends React.Component{

  componentDidMount(){
    const content = this._content;
    const anchors = content.getElementsByTagName('a');
    const r = new RegExp('^(?:[a-z]+:)?//', 'i');
    _.map(anchors, anchor => {
      const target = anchor.getAttribute("href");

      if (!r.test(target)){
        console.log('not r');
        anchor.addEventListener('click', (e)=>{
          e.preventDefault();
          browserHistory.push(anchor.href);
        });
      }
    });
  }

  _parseContent(){
    const { post_content } = this.props;
    const trimmed = post_content.trim();
    let content = trimmed.split('\n');
    let voidTags = ["p","h1", "h2", "h3", "h4", "h5", "code", "pre", "img"]

    _.map(content, (line, index) => {
      let tag = line.match(/^<\w+/g);
      tag = tag ? tag[0].slice(1) : '';
      if (voidTags.indexOf(tag) === -1 && line.length > 1){
        line = '<p>' + line + '</p>';
      }
      content[index] = line;
    });

    return {
      __html: content.join('')
    }
  }

  render(){
    return(
      <div ref={ (c)=> this._content = c } styleName="content" dangerouslySetInnerHTML = {this._parseContent()}></div>
    )
  }
}

export default PostContent;

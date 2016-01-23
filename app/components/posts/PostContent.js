import React from 'react';
import _ from 'lodash';
import htmlparser from 'htmlparser2';

class PostContent extends React.Component{

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
      <div dangerouslySetInnerHTML = {this._parseContent()}/>
    )
  }
}

export default PostContent;

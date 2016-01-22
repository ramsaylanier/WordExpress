import React from 'react';
import _ from 'lodash';
import htmlparser from 'htmlparser2';

class PostContent extends React.Component{

  _parseContent(){
    const { post_content } = this.props;
    // let content = post_content.trim().split('\n');
    // return _.map(content, chunk => {
    //   console.log(chunk);
    //   var handler = new htmlparser.DomHandler(function (error, dom) {
    //     if (error){
    //       console.log(error)
    //     }
    //     else{
    //       return dom
    //     }
    //   });
    //   var parser = new htmlparser.Parser(handler);
    //   parser.write(chunk);
    //   parser.done();
    //
    //   return _.map(handler.dom, (item, index) => {
    //     return parseDOMItem(item, index);
    //   })
    // })
    //
    //
    // function parseDOMItem(item, index){
    //   console.log(item);
    //   console.log(index);
    //   const { type, name, children, next } = item;
    //   let nextItem = next ? parseDOMItem(next) : ''
    //
    //   if (type === "tag" ){
    //     if (name === 'a'){
    //       const { href } = item.attribs;
    //       return(
    //         <a href={href}>
    //           {children.map( child => {
    //             return child.data
    //           })}
    //         </a>
    //
    //       )
    //     }
    //   } else if (type === "text") {
    //     let content = item.data.trim();
    //     let nextItem = next ? parseDOMItem(next) : ''
    //     return(
    //       <p>
    //         {item.data}
    //         {nextItem}
    //       </p>
    //     )
    //   }
    // }


    const trimmed = post_content.trim();
    // let content = trimmed.replace(/[\r\n]+/g,'<p></p>');
    console.log(trimmed);
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

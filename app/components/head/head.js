import React from "react";
import Helmet from "react-helmet";

class Head extends React.Component{
  render(){
    return(
      <Helmet
          title="WordExpress"
          titleTemplate="WordExpress - %s"
          meta={[
              {"name": "description", "content": "Replacing PHP with Javascript in WordPress development"},
              {"property": "og:title", "content": "WordExpress"},
              {"property": "og:type", "content": "website"},
              {"property": "og:description", "content": "Replacing PHP with Javascript in WordPress development"},
              {"property": "og:image", "content": "http://wordexpress.s3.amazonaws.com/wp-content/uploads/2016/01/24195552/logowithtype.png"}
          ]}
          link={[
              {"rel": "canonical", "href": "http://wordexpress.io"},
          ]}
          onChangeClientState={(newState) => console.log(newState)}
      />
    )
  }
}

export default Head;

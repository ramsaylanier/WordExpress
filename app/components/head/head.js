import React from "react";
import Helmet from "react-helmet";

class Head extends React.Component{
  render(){
    return(
      <Helmet
          title="WordExpress"
          titleTemplate="WordExpress - %s"
          meta={[
              {"name": "description", "content": "WordExpress application"},
              {"property": "og:type", "content": "website"}
          ]}
          link={[
              {"rel": "canonical", "href": "http://wordexpress.io"},
              {"rel": "apple-touch-icon", "href": "http://mysite.com/img/apple-touch-icon-57x57.png"},
              {"rel": "apple-touch-icon", "sizes": "72x72", "href": "http://mysite.com/img/apple-touch-icon-72x72.png"}
          ]}
          onChangeClientState={(newState) => console.log(newState)}
      />
    )
  }
}

export default Head;

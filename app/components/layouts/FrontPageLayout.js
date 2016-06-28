import React from 'react';
import Page from '../pages/page.js';
import PostContent from '../posts/PostContent';
import { connect } from 'react-apollo';

class FrontPageLayout extends React.Component{

	render(){
    console.log('front page render');
    const { loading } = this.props.page;

    if (loading){
      return (
        <div>Loading...</div>
      )
    } else {
      const { post_title, post_content, thumbnail} = this.props.page.viewer.page;
  		let bg = {
  			backgroundImage: "url('" + thumbnail + "')"
  		}

  		let heroClass = thumbnail ? "hero_thumbnail" : "hero"

  		return (
  			<div>
  				<div styleName={heroClass} style={bg}>
  					<div styleName="wrapper tight">
  						<h1 styleName="title">WordExpress</h1>
  						<h4 styleName="subtitle">WordPress using Node, Express, and React.</h4>
  					</div>
  				</div>

  				<div styleName="content">
  					<div styleName="wrapper tight">
  						<PostContent post_content={post_content}/>
  					</div>
  				</div>
        </div>
  		)
    }
	}
}


const FrontPageWithData = connect({
  mapQueriesToProps({ ownProps, state}) {
    return {
      page: {
        query: `
          query getPage{
            viewer{
              page(post_name: "homepage"){
                id,
      					post_title
      					post_content
      					thumbnail
              }
            }
          }
        `
      }
    }
  }
})(FrontPageLayout);

export default FrontPageWithData;

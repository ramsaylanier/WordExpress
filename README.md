# Wordpress Express

This project is my attempt at using Node.js and Express to consume data from a Wordpress database using GraphQL and Relay and React and...other stuff. **This repo is the codebase for [wordexpress.io](http://wordexpress.io), where I will write articles and documentation explaining how it works**.

It's built using Webpack, and requires Node V 5.0.0. You might be able to get away with 4.0, but really just tighten up and use 5.0. 

## Docs on Medium
[Part 1 - Introduction](https://medium.com/@verybadhello/wordpress-with-node-react-and-graphql-part-1-introduction-ee0fc491730e#.ir4lezuav)

[Part 2 - The Setup](https://medium.com/@verybadhello/wordpress-with-node-react-and-graphql-part-2-the-setup-adbbfba1e776#.oizvqnau7)

[Part 3 - The Schema](https://medium.com/@verybadhello/wordpress-with-node-react-and-graphql-part-3-the-schema-8569a89016c#.w2dcbi5en)

## Getting Started
Just run ```npm install``` and then ```npm run startdev```
To build for production, run ```npm run build```, which creates a ```dist``` folder in the root directory which contains production-ready code. You can run ```npm start``` which will start the express server using code in the ```dist``` folder. 

## Defining Your Application Settings
You'll notice a [settings](https://github.com/ramsaylanier/WordpressExpress/tree/master/settings) folder, which contains JSON files for development. This is where you can define settings for uploads, wordpress database connection, and some other things. Change accordingly. For production, create a prod.json file in the same format as dev.json.

#### Upload Settings
This project uses Amazon AWS with an S3 bucket. If you are hosting your media files on the same server as your wordpress installation, set amazonS3 to false and set the uploads directory accordingly. If you are using S3, set don't include 'wp-content/uploads' to the end of the setting - it will be added for you. 

#### Database Settings
This should be pretty self-explanatory: simply enter in the name of your database, username and password, and host. Make sure these are inside of "private", or else they'll be available on the client (WHICH IS BAD).  

## Setting the Landing Page
When you run ```npm startdev``` for the first time, you'll probably get an error saying "cannot find page-title of undefined." This is probably because you haven't set a landing page in Wordpress. By default, the [LandingPage](https://github.com/ramsaylanier/WordpressExpress/blob/master/app/components/pages/LandingPage.js) component queries a post with the post-name (AKA slug) of "homepage". If you are using a fresh Wordpress installation, simply create a page and give it a slug of "homepage." If you are working with an exsiting Wordpress database, you can change which page that gets loaded by changing the page query in the ```LandingPage``` component. See below:

```
export default Relay.createContainer(LandingPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        page(post_name:"homepage"){
					id,
					post_title
					post_content
				}
      }
    `,
  },
});
```

Simply change "homepage" to anything you want. Keep in mind that it queries the post-name (AKA slug), not the post-title. 


## Using React Components as Layouts
You can use any React component you'd like as a page layout by using a custom field in Wordpress. First, in your application add the layout to the ```Layouts``` object in the [layouts directory](https://github.com/ramsaylanier/WordpressExpress/blob/master/app/components/layouts/layouts.js). The ```Layouts``` object stores some basic parameters that the ```WordpressPage``` component will read. It looks like this:

```
import PostList from '../posts/PostList.js';
import DefaultLayout from './DefaultLayout.js';

const Layouts = {
  'Default': {
    Component: DefaultLayout,
    showPosts: false
  },
  'PostList': {
    Component: PostList,
    showPosts: true,
    postType: 'post',
    limit: 10
  }
};


export default Layouts;
```

Then, simply add a ```react_layout``` custom field to your wordpress page. The value of the field must be the name of the layout in the ```Layouts``` object. [Here's how you can add custom fields to a page](https://codex.wordpress.org/Custom_Fields). 

##Playing With GraphQL
For experimentation purposes, I've kept the GrapiQL IDE publically available so you can play aroud with querying the WordExpress database. [Check it out here](http://wordexpress.io:8080).


### React by default
The project runs with React by default and hot replacement of changes to the modules.

### React CSS Modules
SASS files loaded into components are locally scoped and you can point to class names with javascript. You can also compose classes together, also from other files. These are also hot loaded. Read more about them [here](http://glenmaddern.com/articles/css-modules).

### Babel and Linting
Both Node server and frontend code runs with Babel. And all of it is linted. With atom you install the `linter` package, then `linter-eslint` and `linter-jscs`. You are covered. Also run `npm run eslint` or `npm run jscs` to verify all files. I would recommend installing `language-babel` package too for syntax highlighting

### Beautify
With a beautify package installed in your editor it will also do that

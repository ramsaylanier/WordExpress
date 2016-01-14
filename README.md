# Wordpress Express
This project is my attempt at using Node.js and Express to consume data from a Wordpress database using GraphQL and Relay and React and...other stuff.

It's built using Webpack, and requires Node V 5.0.0. You might be able to get away with 4.0, but really just tighten up and use 5.0. 

You should also read about [why I am doing this](https://medium.com/@verybadhello/wordpress-with-node-react-and-graphql-part-1-introduction-ee0fc491730e#.4e1pvhq67). 

## Major update to project
Inspired by [this project](https://github.com/vesparny/react-kickstart) and the evolving of [react-transform](https://github.com/gaearon/react-transform-boilerplate) and [CSS Modules]((http://glenmaddern.com/articles/css-modules)), this project has gotten a major upgrade.


## Get Started
Just run ```npm install``` and then ```npm start```

### React by default
The project runs with React by default and hot replacement of changes to the modules.

### React CSS Modules
SASS files loaded into components are locally scoped and you can point to class names with javascript. You can also compose classes together, also from other files. These are also hot loaded. Read more about them [here](http://glenmaddern.com/articles/css-modules).


### Babel and Linting
Both Node server and frontend code runs with Babel. And all of it is linted. With atom you install the `linter` package, then `linter-eslint` and `linter-jscs`. You are covered. Also run `npm run eslint` or `npm run jscs` to verify all files. I would recommend installing `language-babel` package too for syntax highlighting

### Beautify
With a beautify package installed in your editor it will also do that

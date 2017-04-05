import React, {Component, PropTypes} from 'react';
import Head from './components/head/head';
import Header from './components/header/header';

class App extends Component {

  static propTypes = {
    children: PropTypes.object
  }

  render() {
    const { children } = this.props;
    return (
      <div className="application">
        <Head/>
        <Header/>
        {children}
      </div>
    );
  }
}

export default App;

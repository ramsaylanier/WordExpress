import React from 'react';
import { connect } from 'react-apollo';

import styles from './styles.scss';
import Head from './components/head/head';
import Header from './components/header/header';
import Page from './components/pages/page';

class App extends React.Component {

  render() {
    console.log(this.props);
    const { children } = this.props;
    return (
      <div className="application">
        <Head/>
        <Header/>
        {children}
      </div>
    )
  }
}

export default App;

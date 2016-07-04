import React from 'react';
import Head from './components/head/head';
import Header from './components/header/header';

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

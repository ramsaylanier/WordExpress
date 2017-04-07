import React, {Component, PropTypes} from 'react'
import Head from './components/head/head'
import Header from './components/header/header'

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div className="application">
        <Head/>
        <Header/>
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

export default App

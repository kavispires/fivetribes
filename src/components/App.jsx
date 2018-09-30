import React, { Component } from 'react';

import Home from './Home';
import SetUp from './SetUp';
import SplashScreen from './SplashScreen';

class App extends Component {
  componentDidMount() {
    const { props } = this;
    props.initialize();
  }

  render() {
    const { props } = this;

    // Home
    if (props.app.screen === 'home') {
      return <Home props={props} />;
    }

    // Setup
    if (props.app.screen === 'setup') {
      return <SetUp props={props} />;
    }

    // // Scorer
    // if (props.app.screen === 'scorer') {
    //   return <Results props={props} />
    // }

    // // Results
    // if (props.app.screen === 'results') {
    //   return <Results props={props} />
    // }

    // Splash Screen
    return <SplashScreen props={props} />;
  }
}

export default App;

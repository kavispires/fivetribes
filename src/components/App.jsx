import React, { Component } from 'react';

import SplashScreen from './SplashScreen';

class App extends Component {
  componentDidMount() {
    const { props } = this;
    props.initialize();
  }

  render() {
    const { props } = this;

    // Home
    // if (props.app.screen === 'home') {
    //   return <Home props={props} />;
    // }

    // // Options
    // if (props.app.screen === 'options') {
    //   return <Results props={props} />
    // }

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

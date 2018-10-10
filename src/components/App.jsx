import React, { Component } from 'react';

import Home from './Home';
import SetUp from './SetUp';
import SplashScreen from './SplashScreen';
import Scorer from './scorer/Scorer';
import Borders from './Borders';

class App extends Component {
  componentDidMount() {
    const { props } = this;
    props.initialize();

    const body = document.getElementById('root');
    props.overrideViewPort(body);
  }

  render() {
    const { props } = this;

    // Splash Screen
    let screenComponent = <SplashScreen props={props} />;

    // Home
    if (props.app.screen === 'home') {
      screenComponent = <Home props={props} />;
    }

    // Setup
    else if (props.app.screen === 'setup') {
      screenComponent = <SetUp props={props} />;
    }

    // Scorer
    else if (props.app.screen === 'scorer') {
      screenComponent = <Scorer props={props} />;
    }

    return (
      <div
        className="container"
        style={{
          height: props.app.viewport.height || '100vh',
          maxHeight: props.app.viewport.height || '100vh',
          minHeight: props.app.viewport.height || '100vh',
          width: props.app.viewport.width || '100vw',
          maxWidth: props.app.viewport.width || '100vw',
          minWidth: props.app.viewport.width || '100vw',
        }}
      >
        <Borders />
        {screenComponent}
      </div>
    );
  }
}

export default App;

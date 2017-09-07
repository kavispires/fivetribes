import React, { Component } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Hint from '../components/Hint';
import Main from '../components/Main';

class App extends Component {
  render() {
    const {app, scorer} = this.props;
    return (
      <div className="screen">
        <Header />
        <Main props={this.props} />
        {
          app.mode === 'scorer' && scorer.hint
            ? <Hint hint={scorer.hint} />
            : null
        }
        {
          app.mode
            ? <Footer />
            : <footer className="screen-footer-bar" />
        }
      </div>
    );
  }
}

export default App;

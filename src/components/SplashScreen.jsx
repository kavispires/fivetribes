import React from 'react';

import Borders from './Borders';

import Icon from './Icon';

const SplashScreen = () => (
  <main className="container container-splash">
    <Borders />
    <div className="splash-elements">
      <Icon type="splash-camel" styles="splash-camel" />
    </div>
    <Icon type="spinner" styles="splash-spinner" />
  </main>
);

export default SplashScreen;

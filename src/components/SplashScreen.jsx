import React from 'react';

import Icon from './Icon';

const SplashScreen = () => (
  <main className="container-inner container-splash">
    <div className="splash-elements">
      <Icon type="splash-camel" styles="splash-camel" />
    </div>
    <Icon type="spinner" styles="splash-spinner" />
  </main>
);

export default SplashScreen;

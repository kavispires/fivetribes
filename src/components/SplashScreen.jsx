import React from 'react';

import borderLeft from '../images/fancy-border-left.png';
import borderRight from '../images/fancy-border-right.png';

import Icon from './Icon';

const SplashScreen = () => (
  <main className="container container-splash">
    <img src={borderLeft} alt="Border Left" className="border border-left" />
    <img src={borderRight} alt="Border Right" className="border border-right" />
    <div className="splash-elements">
      <Icon type="splash-camel" styles="splash-camel" />
    </div>
    <Icon type="spinner" styles="splash-spinner" />
  </main>
);

export default SplashScreen;

/* eslint react/jsx-first-prop-new-line: 0 */
/* eslint react/jsx-max-props-per-line: 0 */
/* eslint react/jsx-tag-spacing: 0 */
/* eslint react/jsx-closing-bracket-location: 0 */
/* eslint max-len: 0 */

import React from 'react';

const iconBack = (
  <g className="icon-back">
    <path
      className="primary"
      d="M50.3,20.2V0c-9,20.9-37.1,30.1-37.1,30.1c18.6,4.5,37.1,30.1,37.1,30.1V37.4c9.7,2.3,45,14.4,12,62.6
	C62.3,100,124.7,21.8,50.3,20.2z"
    />
  </g>
);

const iconBadge = (
  <g className="icon-badge">
    <polygon
      className="primary"
      points="90.8,68.6 50,100 9.2,68.6 9.2,0 90.8,0 	"
    />
  </g>
);

const iconSpinner = (
  <g className="icon-spinner">
    <path
      className="primary"
      d="M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50c27.6,0,50-22.4,50-50C100,22.4,77.6,0,50,0z M75,50
	c0,13.8-11.2,25-25,25c-13.8,0-25-11.2-25-25c0-13.8,11.2-25,25-25C63.8,25,75,36.2,75,50L75,50z M81.2,50c0-17.2-14-31.2-31.2-31.2
	V6.2c24.2,0,43.8,19.6,43.8,43.8H81.2z"
    />
  </g>
);

const iconSplashCamel = (
  <g className="icon-splash-camel">
    <path
      className="primary"
      d="M5,71.9c-0.9,0.7-1.8,1.4-2.7,2.1c-2.6,2.1-3.2,7.6-1.1,10c29.1,0,58.2,0,87.3,0c0.5-1.6,1-3.1,1.4-4.4
	c-1.2-1.2-2.3-2.1-3.2-3c-2-2-2.1-4.6-0.9-7.1c4.2-8.5,7.6-16,7-25.7c-0.2-3.9-2.8-6.5-3.2-10.3c-0.2-1.7,0.1-4.3,1.9-5.1
	c1.4-0.6,2.8-0.7,4.2-1.3c1.3-0.6,2.4-1.5,3.3-2.5c0.8-0.9,1-1.6,0.9-2.1c-0.3-0.9-1.7-1.3-3-2c-1.3-0.6-2.6-1.3-3.9-1.9
	c-4.3-2.2-8.7-3.2-13.5-2c-2.7,0.7-3.8,1.8-3.9,4.6c0,1.5-0.1,3-0.1,4.4c0.1,4.6-5.8,8.9-8.1,12.6c-1.4,2.3-6.5,4.4-9.1,3.7
	c-2.9-0.8-3.7-6.8-5.1-9.2c-1.9-3.2-4.6-6-7.3-8.4c-6-5.2-10.8-5.3-17.6-1.2c-5,3-9,7.1-12.5,11.6c-2.2,2.9-3.3,6.7-5,10
	c-0.6,1.2-1.2,2.5-2.3,3.2c-4,2.7-5.8,6.4-5.3,11c0.2,1.7,1.3,3.5,2.4,4.8C8.4,66.7,8.3,69.6,5,71.9z"
    />
  </g>
);

const icons = {
  back: iconBack,
  badge: iconBadge,
  spinner: iconSpinner,
  splashCamel: iconSplashCamel,
};

export default icons;

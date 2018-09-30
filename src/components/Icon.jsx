import React from 'react';
import PropTypes from 'prop-types';

import icons from './icons';

const Icon = ({ type, styles = 'small' }) => {
  let icon;

  switch (type) {
    case 'back':
      icon = icons.back;
      break;

    case 'spinner':
      icon = icons.spinner;
      break;

    case 'splash-camel':
      icon = icons.splashCamel;
      break;

    default:
      icon = icons.default;
  }

  const mergeStyles = (...args) => Object.assign({}, ...args);

  const style = {};

  return (
    <span className={`icon ${styles}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={mergeStyles(
          styles,
          style // This lets the parent pass custom styles
        )}
      >
        {icon}
      </svg>
    </span>
  );
};

Icon.propTypes = {
  type: PropTypes.string,
  styles: PropTypes.string,
};

Icon.defaultProps = {
  type: 'default',
  styles: 'small',
};

export default Icon;

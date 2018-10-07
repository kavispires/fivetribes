import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const BackButton = ({ handleBackButton }) => (
  <button type="button" className="btn-back" onClick={handleBackButton}>
    <Icon type="back" styles="back-button" onClick={handleBackButton} />
  </button>
);

BackButton.propTypes = {
  handleBackButton: PropTypes.func,
};

BackButton.defaultProps = {
  handleBackButton: () => {},
};

export default BackButton;

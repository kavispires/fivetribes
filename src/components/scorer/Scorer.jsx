import React from 'react';
import PropTypes from 'prop-types';

import Djinns from './Djinns';
import Main from './Main';
import Merch from './Merch';

const Scorer = ({ props }) => {
  // Djinss
  if (props.scorer.subscreen === 'scorer-djinns') {
    return <Djinns props={props} />;
  }

  // Merch
  if (props.scorer.subscreen === 'scorer-merch') {
    return <Merch props={props} />;
  }

  // // Oasis
  // if (props.scorer.subscreen === 'scorer-oasis') {
  //   return <Oasis props={props} />;
  // }

  // // Villages
  // if (props.scorer.subscreen === 'scorer-villages') {
  //   return <Villages props={props} />;
  // }

  // // PreciousItems
  // if (props.scorer.subscreen === 'scorer-precious-items') {
  //   return <PreciousItems props={props} />;
  // }

  // // Tiles
  // if (props.scorer.subscreen === 'scorer-tiles') {
  //   return <Tiles props={props} />;
  // }

  // // TilesSelect
  // if (props.scorer.subscreen === 'scorer-tiles-select') {
  //   return <TilesSelect props={props} />;
  // }

  // // Result
  // if (props.scorer.subscreen === 'scorer-result') {
  //   return <Result props={props} />;
  // }

  // Main Screen
  return <Main props={props} />;
};

Scorer.propTypes = {
  props: PropTypes.object.isRequired,
  scorer: PropTypes.object,
};

Scorer.defaultProps = {
  scorer: {},
};

export default Scorer;

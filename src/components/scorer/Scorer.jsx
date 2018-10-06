import React from 'react';
import PropTypes from 'prop-types';

import ScorerMain from './ScoreMain';

const Scorer = ({ props }) => {
  // // Djinss
  // if (props.scorer.subscreen === 'djinns') {
  //   return <Djinns props={props} />;
  // }

  // // Merch
  // if (props.scorer.subscreen === 'merch') {
  //   return <Merch props={props} />;
  // }

  // // Oasis
  // if (props.scorer.subscreen === 'oasis') {
  //   return <Oasis props={props} />;
  // }

  // // Villages
  // if (props.scorer.subscreen === 'villages') {
  //   return <Villages props={props} />;
  // }

  // // PreciousItems
  // if (props.scorer.subscreen === 'precious-items') {
  //   return <PreciousItems props={props} />;
  // }

  // // Tiles
  // if (props.scorer.subscreen === 'tiles') {
  //   return <Tiles props={props} />;
  // }

  // // TilesSelect
  // if (props.scorer.subscreen === 'tiles-select') {
  //   return <TilesSelect props={props} />;
  // }

  // // Result
  // if (props.scorer.subscreen === 'result') {
  //   return <Result props={props} />;
  // }

  // Main Screen
  return <ScorerMain props={props} />;
};

Scorer.propTypes = {
  props: PropTypes.object.isRequired,
};

export default Scorer;

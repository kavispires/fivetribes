import React from 'react';
import PropTypes from 'prop-types';

import Borders from '../Borders';
import Image from '../Image';
import RowHeader from './RowHeader';
import RowNumber from './RowNumber';

const Tiles = ({ props }) => (
  <main className="container container-scorer container-scorer-djinns">
    <Borders />
    <Image src="logo" className="logo-top" alt="logo" extension="png" />

    {props.scorer.hint.length > 0 ? (
      <div className="hint">{props.scorer.hint}</div>
    ) : (
      <div className="hint-placeholder">&nbsp;</div>
    )}

    <p className="p-scorer-instructions">
      There are two ways to enter tile points: by inputing the total amount of
      points or by selecting tiles per player
    </p>

    <div className="tile-screen-type-switch">
      <button
        type="button"
        className="btn btn-lg btn-hollow"
        onClick={() => props.updateButtonCell('scorer-tiles-select')}
      >
        Switch to Tiles Selection
      </button>
    </div>

    {props.scorer.categories.tiles ? (
      <ul className="scorer-table">
        <RowHeader colors={props.scorer.colors} />

        <RowNumber
          name={props.scorer.categories.tiles[0].name}
          icon={props.scorer.categories.tiles[0].icon}
          colors={props.scorer.colors}
          values={props.scorer.scores[props.scorer.categories.tiles[0].name]}
          action={props.updateNumberCell}
          hint={props.scorer.categories.tiles[0].hint}
          toggleHint={props.toggleHint}
        />
        {props.scorer.categories.tiles[1] ? (
          <p className="p-scorer-table">
            Score Fabulous Cities (5+) separately here, with just the number of
            tiles:
          </p>
        ) : null}
        {props.scorer.categories.tiles[1] ? (
          <RowNumber
            name={props.scorer.categories.tiles[1].name}
            icon={props.scorer.categories.tiles[1].icon}
            colors={props.scorer.colors}
            values={props.scorer.scores[props.scorer.categories.tiles[1].name]}
            action={props.updateNumberCell}
            hint={props.scorer.categories.tiles[1].hint}
            toggleHint={props.toggleHint}
          />
        ) : null}
      </ul>
    ) : (
      <p className="p-error">Something is wrong</p>
    )}

    <section className="controls">
      <button
        type="button"
        className="btn btn-lg btn-secondary"
        onClick={() => props.clearCategory('tiles')}
      >
        CLEAR
      </button>
      <button
        type="button"
        className="btn btn-lg"
        onClick={() => props.handleOk('tiles')}
      >
        OK
      </button>
    </section>
  </main>
);

Tiles.propTypes = {
  clearCategory: PropTypes.func,
  handleOk: PropTypes.func,
  props: PropTypes.object.isRequired,
  scorer: PropTypes.object,
  toggleHint: PropTypes.func,
  updateButtonCell: PropTypes.func,
  updateNumberCell: PropTypes.func,
};

Tiles.defaultProps = {
  clearCategory: () => {},
  handleOk: () => {},
  scorer: {},
  toggleHint: () => {},
  updateButtonCell: () => {},
  updateNumberCell: () => {},
};

export default Tiles;

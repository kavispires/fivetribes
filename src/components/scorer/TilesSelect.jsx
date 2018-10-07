import React from 'react';
import PropTypes from 'prop-types';

import Borders from '../Borders';
import Image from '../Image';
import RowNumber from './RowNumber';

const TilesSelect = ({ props }) => {
  const activePlayer = props.scorer.activePlayer || props.scorer.colors[0];

  return (
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
          onClick={() => props.updateButtonCell('scorer-tiles')}
        >
          Switch to Tiles Total
        </button>
      </div>

      <p className="p-scorer-instructions--no-background">
        Select each player and all its tiles
      </p>

      <ul className="scorer-pawn-selection">
        {props.scorer.colors.map(color => {
          const key = `btn-pawn-${color}`;
          const activeClass = activePlayer === color ? `btn-pawn--active` : '';
          return (
            <li key={key} className="scorer-pawn-item">
              <button
                type="button"
                className={`btn-pawn ${key} ${activeClass}`}
                onClick={() => props.handleActivePlayer(color)}
              >
                <Image src="pawn" className="header-pawn" alt={color} />
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="scorer-tiles">
        {Object.keys(props.scorer.tiles).map(k => {
          const tile = props.scorer.tiles[k];
          if (tile.owner === null || tile.owner === activePlayer) {
            return (
              <li key={`btn-tile-${tile.id}`} className="tile">
                <button
                  type="button"
                  className={`btn-tile btn-tile-${tile.owner}`}
                  onClick={() =>
                    props.handleSelectedTile(tile.id, activePlayer)
                  }
                >
                  {tile.value}
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>

      <ul className="scorer-table">
        <RowNumber
          name={props.scorer.categories.tiles[0].name}
          icon={props.scorer.categories.tiles[0].icon}
          colors={props.scorer.colors}
          values={props.scorer.scores[props.scorer.categories.tiles[0].name]}
          action={props.updateNumberCell}
          hint={props.scorer.categories.tiles[0].hint}
          toggleHint={props.toggleHint}
          disabled="true"
        />
        {props.scorer.categories.tiles[1] ? (
          <RowNumber
            name={props.scorer.categories.tiles[1].name}
            icon={props.scorer.categories.tiles[1].icon}
            colors={props.scorer.colors}
            values={props.scorer.scores[props.scorer.categories.tiles[1].name]}
            action={props.updateNumberCell}
            hint={props.scorer.categories.tiles[1].hint}
            toggleHint={props.toggleHint}
            disabled="true"
          />
        ) : null}
      </ul>

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
};

TilesSelect.propTypes = {
  clearCategory: PropTypes.func,
  handleOk: PropTypes.func,
  props: PropTypes.object.isRequired,
  scorer: PropTypes.object,
  toggleHint: PropTypes.func,
  handleActivePlayer: PropTypes.func,
  updateButtonCell: PropTypes.func,
  updateNumberCell: PropTypes.func,
};

TilesSelect.defaultProps = {
  clearCategory: () => {},
  handleOk: () => {},
  scorer: {},
  toggleHint: () => {},
  handleActivePlayer: () => {},
  updateButtonCell: () => {},
  updateNumberCell: () => {},
};

export default TilesSelect;

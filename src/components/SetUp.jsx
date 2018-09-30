import React from 'react';
import PropTypes from 'prop-types';

import Borders from './Borders';
import Image from './Image';

import { COLORS, EXPANSIONS, NUM_PLAYERS } from '../constants';

import { capitalize } from '../utils';

const SetUp = ({ props }) => (
  <main className="container container-setup">
    <Borders />
    <Image src="logo" className="logo-top" alt="logo" extension="png" />

    <div className="setup-flex-group">
      <section className="setup-group">
        <h2>Select number of players</h2>
        <ul className="setup-players">
          {NUM_PLAYERS.map(number => {
            const active = number === props.scorer.numPlayers ? 'active' : '';
            const source = `players-${number}`;
            return (
              <li key={source} onClick={() => props.handleNumPlayers(number)}>
                <Image
                  src={source}
                  className="setup-image"
                  alt={`${number} players`}
                />
                <button
                  type="button"
                  className={`btn-hollow btn-num ${active}`}
                >
                  <span className="btn-num-content">{number}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="setup-group">
        <h2>Select colors</h2>
        <ul className="setup-colors">
          {COLORS.map(color => {
            const active = props.scorer.colors.includes(color) ? 'active' : '';
            const source = `color-${color.toLowerCase()}`;
            return (
              <li key={source} onClick={() => props.handleColors(color)}>
                <Image src={source} className="setup-image" alt={color} />
                <button
                  type="button"
                  className={`btn-hollow btn-100p ${active}`}
                >
                  {capitalize(color)}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="setup-group">
        <h2>Select expansions</h2>
        <ul className="setup-expansions">
          {EXPANSIONS.map(expansion => {
            const active = props.scorer.expansions[expansion] ? 'active' : '';
            const source = `expansion-${expansion.toLowerCase()}`;
            return (
              <li
                key={source}
                onClick={() => props.handleExpansions(expansion)}
              >
                <Image src={source} className="setup-image" alt={expansion} />
                <button
                  type="button"
                  className={`btn-hollow btn-100p ${active}`}
                >
                  {capitalize(expansion)}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="controls">
        {props.scorer.violation.length > 0 ? (
          <div className="violation">{props.scorer.violation}</div>
        ) : (
          <div className="violation-placeholder">&nbsp;</div>
        )}

        <button
          type="button"
          disabled={!props.scorer.isSetupReady}
          className="btn btn-lg btn-center"
          onClick={props.initializeScorer}
        >
          Scorer
        </button>
      </section>
    </div>
  </main>
);

SetUp.propTypes = {
  props: PropTypes.object.isRequired,
  scorer: PropTypes.object,
  handleColors: PropTypes.func,
  handleExpansions: PropTypes.func,
  handleNumPlayers: PropTypes.func,
  initializeScorer: PropTypes.func,
};

SetUp.defaultProps = {
  scorer: {},
  handleColors: () => {},
  handleExpansions: () => {},
  handleNumPlayers: () => {},
  initializeScorer: () => {},
};

export default SetUp;

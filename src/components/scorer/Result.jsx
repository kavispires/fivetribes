import React from 'react';
import PropTypes from 'prop-types';

import Borders from '../Borders';
import Image from '../Image';
import { calculateResults } from '../../utils';

const Result = ({ props }) => {
  const ranking = calculateResults(props.scorer);

  return (
    <main className="container container-scorer container-scorer-result">
      <Borders />
      <Image src="logo" className="logo-top" alt="logo" extension="png" />

      <ul className="result-raking">
        {ranking.map((player, index) => {
          const key = `${player}-${index}`;
          const position = index + 1;
          return (
            <li
              className={`ranking-item ranking-item--${player.color}`}
              key={key}
            >
              <div className="ranking-item__image">
                <div className="ranking-item__pawn">
                  <Image src="pawn" className="pawn-image" alt={player.color} />
                  <span className="ranking-item__position">{position}</span>
                </div>
              </div>
              <div className="ranking-item__info">
                <div className="ranking-item__points">
                  <span className="ranking-item__points-number">
                    {player.total}
                  </span>
                  <span className="ranking-item__points-word">points</span>
                </div>
                <div className="ranking-item__achievements">
                  <ul className="ranking-item__achievements-list">
                    <li className="ranking-item__flag" />
                    <li className="ranking-item__flag" />
                    <li className="ranking-item__flag" />
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <section className="controls">
        <button
          type="button"
          className="btn btn-lg"
          onClick={() => props.handleOk('')}
        >
          OK
        </button>
      </section>
    </main>
  );
};

Result.propTypes = {
  handleOk: PropTypes.func,
  props: PropTypes.object.isRequired,
  scorer: PropTypes.object,
};

Result.defaultProps = {
  handleOk: () => {},
  scorer: {},
};

export default Result;

import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';
import { calculateResults } from '../../utils';
import Icon from '../Icon';

const Result = ({ props }) => {
  const ranking = calculateResults(props.scorer);

  return (
    <main className="container-inner container-scorer container-scorer-result">
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
                  {player.achievements.map(item => (
                    <Icon
                      key={`${player.color}-${item}`}
                      type="badge"
                      styles={`ranking-item__badge ranking-item__badge--${item}`}
                    />
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <section className="badge-legend">
        <h3 className="badge-legend__title">Achievements Legend:</h3>
        <ul className="badge-legend__list">
          {props.scorer.categories.main.map(item => (
            <li className="badge-legend__item" key={item.name}>
              <Icon
                type="badge"
                styles={`badge-legend__icon ranking-item__badge--${item.name}`}
              />
              <span className="badge-legend__name">{item.name}</span>
            </li>
          ))}
        </ul>
      </section>

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

import React from 'react';
import PropTypes from 'prop-types';

import Borders from '../Borders';
import Image from '../Image';
import RowHeader from './RowHeader';
import RowNumber from './RowNumber';
import RowRadio from './RowRadio';

const Djinns = ({ props }) => (
  <main className="container container-scorer container-scorer-djinns">
    <Borders />
    <Image src="logo" className="logo-top" alt="logo" extension="png" />

    {props.scorer.hint.length > 0 ? (
      <div className="hint">{props.scorer.hint}</div>
    ) : (
      <div className="hint-placeholder">&nbsp;</div>
    )}

    {props.scorer.categories.djinns ? (
      <ul className="scorer-table">
        <RowHeader colors={props.scorer.colors} />

        {props.scorer.categories.djinns &&
          props.scorer.categories.djinns.map(category => {
            if (category.type === 'radio') {
              return (
                <RowRadio
                  key={category.name}
                  name={category.name}
                  icon={category.icon}
                  colors={props.scorer.colors}
                  values={props.scorer.scores[category.name]}
                  action={props.updateRadioCell}
                  hint={category.hint}
                  toggleHint={props.toggleHint}
                />
              );
            }
            return (
              <RowNumber
                key={category.name}
                name={category.name}
                icon={category.icon}
                colors={props.scorer.colors}
                values={props.scorer.scores[category.name]}
                action={props.updateNumberCell}
                hint={category.hint}
                toggleHint={props.toggleHint}
              />
            );
          })}
        <p className="p-scorer-table">
          If any player still have Thieves cards, score them here:
        </p>
        {props.scorer.expansions.WHIMS ? (
          <RowNumber
            key={props.scorer.categories.thieves[0].name}
            name={props.scorer.categories.thieves[0].name}
            icon={props.scorer.categories.thieves[0].icon}
            colors={props.scorer.colors}
            values={
              props.scorer.scores[props.scorer.categories.thieves[0].name]
            }
            action={props.updateNumberCell}
            hint={props.scorer.categories.thieves[0].hint}
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
        onClick={() => props.clearCategory('djinns')}
      >
        CLEAR
      </button>
      <button
        type="button"
        className="btn btn-lg"
        onClick={() => props.handleOk('djinns')}
      >
        OK
      </button>
    </section>
  </main>
);

Djinns.propTypes = {
  clearCategory: PropTypes.func,
  handleOk: PropTypes.func,
  props: PropTypes.object.isRequired,
  scorer: PropTypes.object,
  toggleHint: PropTypes.func,
  updateNumberCell: PropTypes.func,
  updateRadioCell: PropTypes.func,
};

Djinns.defaultProps = {
  clearCategory: () => {},
  handleOk: () => {},
  scorer: {},
  toggleHint: () => {},
  updateNumberCell: () => {},
  updateRadioCell: () => {},
};

export default Djinns;

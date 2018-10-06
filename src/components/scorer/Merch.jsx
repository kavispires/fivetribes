import React from 'react';
import PropTypes from 'prop-types';

import Borders from '../Borders';
import Image from '../Image';
import RowHeader from './RowHeader';
import RowNumber from './RowNumber';

const Merch = ({ props }) => (
  <main className="container container-scorer container-scorer-djinns">
    <Borders />
    <Image src="logo" className="logo-top" alt="logo" extension="png" />

    {props.scorer.hint.length > 0 ? (
      <div className="hint">{props.scorer.hint}</div>
    ) : (
      <div className="hint-placeholder">&nbsp;</div>
    )}

    {props.scorer.categories.merch ? (
      <ul className="scorer-table">
        <RowHeader colors={props.scorer.colors} />

        {props.scorer.categories.merch &&
          props.scorer.categories.merch.map(category => (
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
          ))}
      </ul>
    ) : (
      <p className="p-error">Something is wrong</p>
    )}

    <section className="controls">
      <button
        type="button"
        className="btn btn-lg btn-secondary"
        onClick={() => props.clearCategory('merch')}
      >
        CLEAR
      </button>
      <button
        type="button"
        className="btn btn-lg"
        onClick={() => props.handleOk('merch')}
      >
        OK
      </button>
    </section>
  </main>
);

Merch.propTypes = {
  clearCategory: PropTypes.func,
  handleOk: PropTypes.func,
  props: PropTypes.object.isRequired,
  scorer: PropTypes.object,
  toggleHint: PropTypes.func,
  updateNumberCell: PropTypes.func,
};

Merch.defaultProps = {
  clearCategory: () => {},
  handleOk: () => {},
  scorer: {},
  toggleHint: () => {},
  updateNumberCell: () => {},
};

export default Merch;

import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';
import RowHeader from './RowHeader';
import RowNumber from './RowNumber';

const Oasis = ({ props }) => (
  <main className="container-inner container-scorer container-scorer-oasis">
    <Image src="logo" className="logo-top" alt="logo" extension="png" />

    {props.scorer.hint.length > 0 ? (
      <div className="hint">{props.scorer.hint}</div>
    ) : (
      <div className="hint-placeholder">&nbsp;</div>
    )}

    {props.scorer.categories.oasis ? (
      <ul className="scorer-table">
        <RowHeader colors={props.scorer.colors} />

        <RowNumber
          name={props.scorer.categories.oasis[0].name}
          icon={props.scorer.categories.oasis[0].icon}
          colors={props.scorer.colors}
          values={props.scorer.scores[props.scorer.categories.oasis[0].name]}
          action={props.updateNumberCell}
          hint={props.scorer.categories.oasis[0].hint}
          toggleHint={props.toggleHint}
        />
        <p className="p-scorer-table">
          From those palm trees, add the number of the palm trees that are
          around the Great Lake:
        </p>
        <RowNumber
          name={props.scorer.categories.oasis[1].name}
          icon={props.scorer.categories.oasis[1].icon}
          colors={props.scorer.colors}
          values={props.scorer.scores[props.scorer.categories.oasis[1].name]}
          action={props.updateNumberCell}
          hint={props.scorer.categories.oasis[1].hint}
          toggleHint={props.toggleHint}
        />
      </ul>
    ) : (
      <p className="p-error">Something is wrong</p>
    )}

    <section className="controls">
      <button
        type="button"
        className="btn btn-lg btn-secondary"
        onClick={() => props.clearCategory('oasis')}
      >
        CLEAR
      </button>
      <button
        type="button"
        className="btn btn-lg"
        onClick={() => props.handleOk('oasis')}
      >
        OK
      </button>
    </section>
  </main>
);

Oasis.propTypes = {
  clearCategory: PropTypes.func,
  handleOk: PropTypes.func,
  props: PropTypes.object.isRequired,
  scorer: PropTypes.object,
  toggleHint: PropTypes.func,
  updateNumberCell: PropTypes.func,
};

Oasis.defaultProps = {
  clearCategory: () => {},
  handleOk: () => {},
  scorer: {},
  toggleHint: () => {},
  updateNumberCell: () => {},
};

export default Oasis;

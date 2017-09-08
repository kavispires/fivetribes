import React from 'react';

import RowHeader from './RowHeader';
import RowNumber from './RowNumber';

import {
  CATEGORIES_MERCH,
} from '../../constants';

const Oasis = ({props}) => {
  const {scorer} = props;

	return (
    <main className="screen-main screen-scorer-merch">
      <ul className="scorer-table">
        <RowHeader total={scorer.total} />
        {
          CATEGORIES_MERCH.map((category) => (
            <RowNumber key={category} type={category} scorer={scorer} />
          ))
        }
      </ul>
    </main>
  );
};

export default Oasis;

import React from 'react';

import RowHeader from './RowHeader';
import RowNumber from './RowNumber';

import {
  CATEGORIES_ITEMS,
} from '../../constants';

const PreciousItems = ({props}) => {
  const {scorer} = props;

	return (
    <main className="screen-main screen-scorer-precious-items">
      <ul className="scorer-table">
        <RowHeader total={scorer.total} />
        {
          CATEGORIES_ITEMS.map((category) => (
            <RowNumber
              key={category}
              type={category}
              screen={scorer.screen}
              cells={scorer.preciousItemsPoints[category]}
              action={props.updateCell} />
          ))
        }
      </ul>
    </main>
  );
};

export default PreciousItems;

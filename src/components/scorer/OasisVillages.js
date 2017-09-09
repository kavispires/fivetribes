import React from 'react';

import RowHeader from './RowHeader';
import RowNumber from './RowNumber';

import {
  CATEGORIES_OASIS_AND_VILLAGES,
} from '../../constants';

const OasisVillages = ({props}) => {
  const {scorer} = props;

	return (
    <main className="screen-main screen-scorer-oasis-villages">
      <ul className="scorer-table">
        <RowHeader total={scorer.total} />
        {
          CATEGORIES_OASIS_AND_VILLAGES.map((category) => {
            let screen;
            let cells;
            if (category === 'oasis' || category === 'oasisLake') {
              screen = 'oasisTotal';
              cells = scorer.oasisPoints[category];
            } else {
              screen = 'villagesTotal';
              cells = scorer.villagesPoints[category];
            }

            return (
              <RowNumber
                key={category}
                type={category}
                screen={screen}
                cells={cells}
                action={props.updateCell} />
            );
          })
        }
      </ul>
    </main>
  );
};

export default OasisVillages;

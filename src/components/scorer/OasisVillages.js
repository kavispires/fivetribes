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
            let screen = 'villagesTotal';
            if (category === 'oasis' || category === 'oasisLake') {
              screen = 'oasisTotal';
            }

            return (
              <RowNumber
                key={category}
                type={category}
                screen={screen}
                cells={scorer.total}
                action={props.updateCell} />
            );
          })
        }
      </ul>
    </main>
  );
};

export default OasisVillages;

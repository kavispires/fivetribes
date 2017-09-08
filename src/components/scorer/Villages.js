import React from 'react';

import RowButton from './RowButton';
import RowHeader from './RowHeader';
import RowNumber from './RowNumber';
import RowTotal from './RowTotal';

import {
  CATEGORIES,
} from '../../constants';

const Scorer = ({props}) => {
  const {scorer} = props;
  console.log(scorer);
  console.log(props);

	return (
    <main className="screen-main screen-scorer-table">
      <ul className="scorer-table">
        <RowHeader total={scorer.total} />
        {
          CATEGORIES.map((category, i) => {
            if (['djinnsTotal', 'merch'].indexOf(category) !== -1) {
              return <RowButton key={category} type={category} scorer={scorer} />;
            }
            if (scorer.artisansExpansion && category === 'artisans') {
              return <RowNumber key={category} type={category} scorer={scorer} updatePlayerPoints={props.updatePlayerPoints} />;
            }
            if (scorer.artisansExpansion && category === 'preciousItems') {
              return <RowButton key={category} type={category} scorer={scorer} />;
            }
            if (scorer.whimsExpansion && (category === 'oasisTotal' || category === 'villagesTotal')) {
              return <RowButton key={category} type={category} scorer={scorer} />;
            }
            if (scorer.whimsExpansion && category === 'tiles') {
              return <RowButton key={category} type={category} scorer={scorer} />;
            }

            return <RowNumber key={category} type={category} scorer={scorer} updatePlayerPoints={props.updatePlayerPoints} />;
          })
        }
        <RowTotal total={scorer.total} />
      </ul>
    </main>
  );
};

export default Scorer;

import React from 'react';

import { COLORS } from '../../constants';

const RowHeader = ({total}) => {

  return (
    <li className="row header">
      <div className="cell-cat" />
      {
        total.map((item, i) => (
          <div key={`header-${COLORS[i]}`} className={`cell-${total.length}`}>
            <span><img src="/images/pawn.svg" alt={`${COLORS[i]} Player`} /></span>
          </div>
        ))
      }
    </li>
  );
};

export default RowHeader;

import React from 'react';

import { COLORS } from '../../constants';

const RowButton = ({total}) => {

  return (
    <li className="row total">
      <div className="cell-cat">
        <img src="/images/scorer/total.svg" alt="Total" />
      </div>
      {
        total.map((item, i) => (
          <div key={`total-${COLORS[i]}`} className={`cell-${total.length}`}>
            <input type="number" name={`total-${i}`} value={item} readOnly />
          </div>
        ))
      }
    </li>
  );
};

export default RowButton;

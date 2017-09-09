import React from 'react';

import { COLORS } from '../../constants';

const RowRadio = ({type, screen, cells, action}) => {
  return (
    <li className="row" >
      <div className="cell-cat">
        <img src={`/images/scorer/${type}.svg`} alt={type} />
      </div>
      {
        cells.map((value, i) => (
          <div key={`${type}-${COLORS[i]}`} className={`cell cell-${cells.length}`}>
            <input type="radio" name={`${screen}-${type}`} id={`${type}-${i}`} onChange={ action } />
          </div>
        ))
      }
    </li>
  );
};

export default RowRadio;

import React from 'react';

import { COLORS } from '../../constants';

const RowNumber = ({type, scorer, updatePlayerPoints}) => {

  const categoryArray = scorer.playerPoints[type];

  // Define Row Image depending on expansion
  let image = type;
  if (type === 'tiles' && scorer.artisansExpansion) image += 2;
  else if (type === 'tiles' && scorer.whimsExpansion) image += 4;

  return (
    <li className="row" >
      <div className="cell-cat">
        <img src={`/images/categories/category-${image}.svg`} alt={type} />
      </div>
      {
        categoryArray.map((value, i) => (
          <div key={`${type}-${COLORS[i]}`} className={`cell-${categoryArray.length}`}>
            <input type="number" name={`${type}-${i}`} placeholder="0" onChange={ updatePlayerPoints } />
          </div>
        ))
      }
    </li>
  );
};

export default RowNumber;

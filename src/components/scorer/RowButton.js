import React from 'react';

import { COLORS } from '../../constants';

const RowButton = ({type, scorer}) => {

  const categoryArray = scorer.playerPoints[type];

  // Define Row Image
  let image = type;
  if (type === 'djinnsTotal' && scorer.thievesExpansion) image += 2;
  else if (type === 'oasisTotal' && scorer.whimsExpansion) image += 2;
  else if (type === 'villagesTotal' && scorer.whimsExpansion) image += 2;
  else if (type === 'tiles' && scorer.artisansExpansion && scorer.whimsExpansion) image += 3;

  const placeholder = (evt) => console.log(evt.target.name);

  return (
    <li className="row" >
      <div className="cell-cat">
        <img src={`/images/categories/category-${image}.svg`} alt={type} />
      </div>
      {
        categoryArray.map((value, i) => (
          <div key={`${type}-${COLORS[i]}`} className={`cell-${categoryArray.length}`}>
            <input type="button" name={`${type}-${i}`} value={categoryArray[i]} onClick={placeholder} />
          </div>
        ))
      }
    </li>
  );
};

export default RowButton;

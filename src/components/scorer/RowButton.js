import React from 'react';

import { COLORS } from '../../constants';

const RowButton = ({type, scorer, cells, action}) => {

  // Define Row Image
  let image = type;
  if (type === 'djinnsTotal' && scorer.thievesExpansion) image += 'T';
  else if (type === 'oasisTotal' && scorer.whimsExpansion) image += 'W';
  else if (type === 'villagesTotal' && scorer.whimsExpansion) image += 'W';
  else if (type === 'tilesTotal' && scorer.artisansExpansion) image += 'A';
  else if (type === 'tilesTotal' && scorer.whimsExpansion) image += 'W';
  else if (type === 'tilesTotal' && scorer.artisansExpansion && scorer.whimsExpansion) image += 'AW';

  return (
    <li className="row" >
      <div className="cell-cat">
        <img src={`/images/scorer/${image}.svg`} alt={type} />
      </div>
      {
        cells.map((value, i) => (
          <div key={`${type}-${COLORS[i]}`} className={`cell-${cells.length}`}>
            <input type="button" name={`${type}-${i}`} value={value} onClick={() => action(type)} />
          </div>
        ))
      }
    </li>
  );
};

export default RowButton;

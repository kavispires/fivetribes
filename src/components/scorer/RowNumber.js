import React from "react";

import { COLORS } from "../../constants";

const RowNumber = ({ type, screen, cells, action }) => {
  return (
    <li className="row">
      <div className="cell-cat">
        <img
          src={`${process.env.PUBLIC_URL}/images/scorer/${type}.svg`}
          alt={type}
        />
      </div>
      {cells.map((value, i) => (
        <div
          key={`${type}-${COLORS[i]}`}
          className={`cell cell-${cells.length}`}
        >
          <input
            type="number"
            name={`${screen}-${type}-${i}`}
            placeholder={value}
            onChange={action}
          />
        </div>
      ))}
    </li>
  );
};

export default RowNumber;

import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';

const RowTotal = ({ colors, values }) => (
  <li className="row total">
    <div className="cell-category">
      <Image src="category-total" className="category-total" alt="total" />
    </div>
    <div className="cell-group-players">
      {colors.map((color, i) => (
        <div
          key={`total-${color}`}
          className={`cell cell-total cell-${color} cell-${colors.length}`}
        >
          <input type="number" name={`total-${i}`} value={values[i]} disabled />
        </div>
      ))}
    </div>
  </li>
);

RowTotal.propTypes = {
  colors: PropTypes.array.isRequired,

  values: PropTypes.array.isRequired,
};

export default RowTotal;
